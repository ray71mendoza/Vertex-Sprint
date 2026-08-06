import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VertexLogo } from '../ui/VertexLogo';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Sparkles, Eye, EyeOff, UserPlus, LogIn, ChevronDown
} from 'lucide-react';

interface AuthScreenProps {
  onLoginSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const { users, setCurrentUser } = useApp();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('laura.rodriguez@vertexsprint.io');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      setCurrentUser(existingUser);
    }
    onLoginSuccess();
  };

  const handleQuickLogin = (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (targetUser) {
      setCurrentUser(targetUser);
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-vertex-darkBg text-vertex-polarWhite flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden vertex-grid-pattern">
      {/* Background Geometric Facets & Glowing Mesh */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-vertex-apexTeal/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-vertex-prismBlue/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative Geometric SVG Facet Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,0 400,0 200,300" fill="url(#facetGradient1)" />
        <polygon points="1000,800 1400,400 1200,900" fill="url(#facetGradient2)" />
        <defs>
          <linearGradient id="facetGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#72C6E8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0B4551" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="facetGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5896A6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#071A1F" stopOpacity="0.0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Container Card */}
      <div className="w-full max-w-5xl bg-vertex-darkSurface/90 backdrop-blur-md border border-vertex-facetIce/20 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 z-10">
        
        {/* Left Side: Corporate Brand Showcase */}
        <div className="lg:col-span-6 bg-gradient-to-br from-vertex-darkSurfaceElevated via-vertex-apexTeal/40 to-vertex-darkSurface p-8 lg:p-12 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-vertex-facetIce/15 overflow-hidden">
          {/* Subtle Geometric Background Poly */}
          <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-80 h-80 bg-vertex-prismBlue/10 rotate-45 pointer-events-none" />

          <div>
            {/* Official Brand Lockup */}
            <div className="mb-10">
              <VertexLogo size="lg" />
            </div>

            <div className="space-y-4 max-w-md">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-vertex-prismBlue/10 text-vertex-prismBlue border border-vertex-prismBlue/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Plataforma SaaS Empresarial
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-vertex-polarWhite leading-tight">
                Gestión ágil de proyectos con precisión geométrica.
              </h2>
              <p className="text-sm text-vertex-facetIce/80 leading-relaxed">
                Centraliza tableros Scrum, cronogramas interactivos, backlog estratégico y analíticas avanzadas en la extensión digital oficial de Vertex.
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-12 pt-8 border-t border-vertex-facetIce/15 grid grid-cols-2 gap-4 text-xs text-vertex-facetIce/90">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vertex-prismBlue" />
              <span>Tableros Scrum & Kanban</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vertex-prismBlue" />
              <span>Cronograma & Gantt Roadmap</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vertex-prismBlue" />
              <span>Métricas de Velocidad</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vertex-prismBlue" />
              <span>Colaboración en Tiempo Real</span>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between bg-vertex-darkSurface">
          <div>
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-vertex-polarWhite tracking-tight">
                {isLoginTab ? 'Bienvenido a Vertex Sprint' : 'Crear una Cuenta Corporativa'}
              </h3>
              <p className="text-xs text-vertex-facetIce/70 mt-1">
                {isLoginTab ? 'Ingresa tus credenciales para acceder al espacio de trabajo.' : 'Completa tus datos para iniciar la prueba corporativa.'}
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex rounded-xl bg-vertex-darkBg p-1 mb-6 border border-vertex-facetIce/15 text-xs font-semibold">
              <button
                onClick={() => setIsLoginTab(true)}
                className={`flex-1 py-2 text-center rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isLoginTab ? 'bg-vertex-apexTeal text-white font-bold shadow-sm' : 'text-vertex-facetIce/70 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                Iniciar Sesión
              </button>
              <button
                onClick={() => setIsLoginTab(false)}
                className={`flex-1 py-2 text-center rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  !isLoginTab ? 'bg-vertex-apexTeal text-white font-bold shadow-sm' : 'text-vertex-facetIce/70 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                Crear Cuenta
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginTab && (
                <Input
                  label="Nombre Completo"
                  placeholder="Ej. Laura Rodríguez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}

              <Input
                label="Correo Corporativo"
                type="email"
                placeholder="tu.correo@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
              />

              <div className="flex items-center justify-between text-xs text-vertex-facetIce/80 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="rounded border-vertex-facetIce/30 text-vertex-prismBlue focus:ring-vertex-prismBlue bg-vertex-darkBg" />
                  <span>Recordar sesión</span>
                </label>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-vertex-prismBlue font-medium hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full mt-2 font-bold shadow-lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isLoginTab ? 'Ingresar a Vertex Sprint' : 'Crear mi Cuenta Corporativa'}
              </Button>
            </form>
          </div>

          {/* Secondary Collapsible Demo Access */}
          <div className="mt-8 pt-4 border-t border-vertex-facetIce/15">
            <button
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="w-full flex items-center justify-between text-xs font-semibold text-vertex-facetIce/80 hover:text-vertex-prismBlue py-1 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Acceso rápido de demostración
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDemoAccounts ? 'rotate-180' : ''}`} />
            </button>

            {showDemoAccounts && (
              <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                {users.slice(0, 3).map(u => (
                  <button
                    key={u.id}
                    onClick={() => handleQuickLogin(u.id)}
                    className="w-full p-2.5 rounded-xl bg-vertex-darkBg/80 border border-vertex-facetIce/15 hover:border-vertex-prismBlue/50 flex items-center justify-between text-xs text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full border border-vertex-facetIce/20 object-cover" />
                      <div>
                        <div className="font-semibold text-vertex-polarWhite group-hover:text-vertex-prismBlue transition-colors">
                          {u.name} {u.lastName}
                        </div>
                        <div className="text-[10px] text-vertex-facetIce/70">
                          {u.jobTitle} &bull; <span className="uppercase text-[9px] font-bold">{u.role}</span>
                        </div>
                      </div>
                    </div>
                    <UserCheck className="w-4 h-4 text-vertex-facetIce/50 group-hover:text-vertex-prismBlue" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
