import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Persisted configuration file path
const DATA_DIR = path.resolve(__dirname, 'data');
const CONFIG_FILE = path.resolve(DATA_DIR, 'site-config.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Active sessions in-memory (backed by cryptographically generated tokens)
const activeSessions = new Map<string, { username: string; expiresAt: number }>();

// Simple auth secret for sessions
const AUTH_SECRET = process.env.ADMIN_SECRET || 'pizza_cine_secret_key_2026';
const ADMIN_USERNAME = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pizzacine2026';

app.use(express.json({ limit: '10mb' }));

// Helper to get or create initial config
function getSiteConfig(): any {
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error reading config file, falling back to default:', err);
    }
  }
  return null;
}

function saveSiteConfig(config: any): void {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

// Authentication middleware
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token de autenticação não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);

  if (!session || Date.now() > session.expiresAt) {
    if (session) activeSessions.delete(token);
    res.status(401).json({ error: 'Sessão inválida ou expirada' });
    return;
  }

  next();
}

// API Routes
app.get('/api/config', (_req: Request, res: Response) => {
  const config = getSiteConfig();
  if (config) {
    res.json(config);
  } else {
    // If not found on disk, client will use default embedded config
    res.status(404).json({ error: 'Configuração inicial não gerada no servidor' });
  }
});

app.put('/api/config', requireAuth, (req: Request, res: Response) => {
  const newConfig = req.body;
  if (!newConfig || !newConfig.plans || !Array.isArray(newConfig.plans)) {
    res.status(400).json({ error: 'Formato de configuração inválido' });
    return;
  }

  try {
    saveSiteConfig(newConfig);
    res.json({ success: true, message: 'Configuração atualizada e persistida com sucesso!' });
  } catch (err: any) {
    res.status(500).json({ error: 'Falha ao gravar arquivo de configuração: ' + err.message });
  }
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    return;
  }

  // Check credentials
  if (username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase() && password === ADMIN_PASSWORD) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    activeSessions.set(token, { username: ADMIN_USERNAME, expiresAt });
    res.json({ token, username: ADMIN_USERNAME });
    return;
  }

  res.status(401).json({ error: 'Credenciais administrativas inválidas' });
});

app.get('/api/auth/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.json({ valid: false });
    return;
  }
  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);
  if (session && Date.now() <= session.expiresAt) {
    res.json({ valid: true, username: session.username });
  } else {
    res.json({ valid: false });
  }
});

// App server setup (dev with Vite or prod with static files)
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Pizza Cine] Server listening on port ${PORT} (isProduction=${isProduction})`);
  });
}

startServer().catch((err) => {
  console.error('[Pizza Cine] Failed to start server:', err);
});
