'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Calendar, Users, Settings, Phone, Mail, Instagram, Facebook, Zap, Brain, Clock, CheckCircle, Menu, X } from 'lucide-react'
import { ChatInterface } from './components/ChatInterface'
import { AgendamentosInterface } from './components/AgendamentosInterface'
import { ClientesInterface } from './components/ClientesInterface'
import { ConfiguracaoIA } from './components/ConfiguracaoIA'

interface Conversa {
  id: string
  cliente: string
  canal: 'whatsapp' | 'instagram' | 'facebook' | 'sms' | 'email'
  ultimaMensagem: string
  timestamp: Date
  status: 'ativo' | 'pendente' | 'resolvido'
  setor: string
}

interface Agendamento {
  id: string
  cliente: string
  servico: string
  data: Date
  status: 'confirmado' | 'pendente' | 'cancelado'
  canal: string
}

interface Cliente {
  id: string
  nome: string
  telefone: string
  email: string
  consentimento: boolean
  ultimoContato: Date
  totalAgendamentos: number
}

const setoresDisponiveis = [
  { id: 'barbearia', nome: 'Barbearia', cor: 'from-blue-500 to-blue-600' },
  { id: 'salao', nome: 'Salão de Beleza', cor: 'from-pink-500 to-pink-600' },
  { id: 'eletricista', nome: 'Eletricista', cor: 'from-yellow-500 to-yellow-600' },
  { id: 'dentista', nome: 'Dentista', cor: 'from-green-500 to-green-600' },
  { id: 'mecanica', nome: 'Mecânica', cor: 'from-gray-500 to-gray-600' },
  { id: 'pet', nome: 'Pet Shop', cor: 'from-purple-500 to-purple-600' }
]

export default function SmartBookAI() {
  const [abaSelecionada, setAbaSelecionada] = useState('dashboard')
  const [setorAtivo, setSetorAtivo] = useState('barbearia')
  const [conversas, setConversas] = useState<Conversa[]>([])
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)

  // Dados simulados
  useEffect(() => {
    setConversas([
      {
        id: '1',
        cliente: 'João Silva',
        canal: 'whatsapp',
        ultimaMensagem: 'Gostaria de agendar um corte para amanhã',
        timestamp: new Date(),
        status: 'ativo',
        setor: 'barbearia'
      },
      {
        id: '2',
        cliente: 'Maria Santos',
        canal: 'instagram',
        ultimaMensagem: 'Qual o preço da escova progressiva?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: 'pendente',
        setor: 'salao'
      },
      {
        id: '3',
        cliente: 'Pedro Costa',
        canal: 'facebook',
        ultimaMensagem: 'Preciso de um eletricista urgente',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        status: 'ativo',
        setor: 'eletricista'
      }
    ])

    setAgendamentos([
      {
        id: '1',
        cliente: 'João Silva',
        servico: 'Corte + Barba',
        data: new Date(Date.now() + 1000 * 60 * 60 * 24),
        status: 'confirmado',
        canal: 'whatsapp'
      },
      {
        id: '2',
        cliente: 'Ana Paula',
        servico: 'Escova + Hidratação',
        data: new Date(Date.now() + 1000 * 60 * 60 * 48),
        status: 'pendente',
        canal: 'instagram'
      }
    ])

    setClientes([
      {
        id: '1',
        nome: 'João Silva',
        telefone: '(11) 99999-9999',
        email: 'joao@email.com',
        consentimento: true,
        ultimoContato: new Date(),
        totalAgendamentos: 15
      },
      {
        id: '2',
        nome: 'Maria Santos',
        telefone: '(11) 88888-8888',
        email: 'maria@email.com',
        consentimento: true,
        ultimoContato: new Date(Date.now() - 1000 * 60 * 60 * 24),
        totalAgendamentos: 8
      }
    ])
  }, [])

  const getIconeCanal = (canal: string) => {
    switch (canal) {
      case 'whatsapp': return <MessageSquare className="w-4 h-4 text-green-500" />
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-500" />
      case 'sms': return <Phone className="w-4 h-4 text-orange-500" />
      case 'email': return <Mail className="w-4 h-4 text-gray-500" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  const estatisticas = {
    conversasAtivas: conversas.filter(c => c.status === 'ativo').length,
    agendamentosHoje: agendamentos.filter(a => 
      new Date(a.data).toDateString() === new Date().toDateString()
    ).length,
    totalClientes: clientes.length,
    taxaResposta: 94
  }

  const abas = [
    { id: 'dashboard', nome: 'Dashboard', icone: Zap },
    { id: 'conversas', nome: 'Conversas', icone: MessageSquare },
    { id: 'agendamentos', nome: 'Agendamentos', icone: Calendar },
    { id: 'clientes', nome: 'Clientes', icone: Users },
    { id: 'ia-config', nome: 'Config IA', icone: Brain }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Mobile-First */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo e Menu Mobile */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMenuMobileAberto(!menuMobileAberto)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                {menuMobileAberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">SmartBook AI</h1>
              </div>
            </div>

            {/* Setor Selector - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-gray-500">Setor:</span>
              <select 
                value={setorAtivo}
                onChange={(e) => setSetorAtivo(e.target.value)}
                className="text-sm border rounded-lg px-3 py-1 bg-white"
              >
                {setoresDisponiveis.map(setor => (
                  <option key={setor.id} value={setor.id}>{setor.nome}</option>
                ))}
              </select>
            </div>
            
            {/* Status e Settings */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm text-gray-600">IA Ativa</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Setor Selector Mobile */}
          <div className="md:hidden pb-3">
            <select 
              value={setorAtivo}
              onChange={(e) => setSetorAtivo(e.target.value)}
              className="w-full text-sm border rounded-lg px-3 py-2 bg-white"
            >
              {setoresDisponiveis.map(setor => (
                <option key={setor.id} value={setor.id}>{setor.nome}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Menu Mobile Overlay */}
      {menuMobileAberto && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setMenuMobileAberto(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-gray-900">Menu</span>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              {abas.map(aba => {
                const Icone = aba.icone
                return (
                  <button
                    key={aba.id}
                    onClick={() => {
                      setAbaSelecionada(aba.id)
                      setMenuMobileAberto(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all text-left ${
                      abaSelecionada === aba.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icone className="w-5 h-5" />
                    <span>{aba.nome}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Navegação Desktop */}
        <nav className="hidden md:flex space-x-2 lg:space-x-8 mb-6 lg:mb-8 overflow-x-auto">
          {abas.map(aba => {
            const Icone = aba.icone
            return (
              <button
                key={aba.id}
                onClick={() => setAbaSelecionada(aba.id)}
                className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  abaSelecionada === aba.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <Icone className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="text-sm lg:text-base">{aba.nome}</span>
              </button>
            )
          })}
        </nav>

        {/* Dashboard */}
        {abaSelecionada === 'dashboard' && (
          <div className="space-y-6 lg:space-y-8">
            {/* Estatísticas - Grid Responsivo */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Conversas Ativas</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{estatisticas.conversasAtivas}</p>
                  </div>
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 self-end sm:self-auto" />
                </div>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Agendamentos Hoje</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{estatisticas.agendamentosHoje}</p>
                  </div>
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 self-end sm:self-auto" />
                </div>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Clientes</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{estatisticas.totalClientes}</p>
                  </div>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 self-end sm:self-auto" />
                </div>
              </div>
              
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Taxa de Resposta</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{estatisticas.taxaResposta}%</p>
                  </div>
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 self-end sm:self-auto" />
                </div>
              </div>
            </div>

            {/* Conversas Recentes */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 sm:p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Conversas Recentes</h3>
              </div>
              <div className="divide-y">
                {conversas.slice(0, 5).map(conversa => (
                  <div key={conversa.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        {getIconeCanal(conversa.canal)}
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">{conversa.cliente}</p>
                          <p className="text-sm text-gray-600 truncate">{conversa.ultimaMensagem}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          conversa.status === 'ativo' 
                            ? 'bg-green-100 text-green-800'
                            : conversa.status === 'pendente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {conversa.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {conversa.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximos Agendamentos */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 sm:p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Próximos Agendamentos</h3>
              </div>
              <div className="divide-y">
                {agendamentos.slice(0, 3).map(agendamento => (
                  <div key={agendamento.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">{agendamento.cliente}</p>
                          <p className="text-sm text-gray-600 truncate">{agendamento.servico}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full self-start sm:self-auto ${
                          agendamento.status === 'confirmado' 
                            ? 'bg-green-100 text-green-800'
                            : agendamento.status === 'pendente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {agendamento.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {agendamento.data.toLocaleDateString()} às {agendamento.data.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Outras abas */}
        {abaSelecionada === 'conversas' && (
          <ChatInterface conversas={conversas} setorAtivo={setorAtivo} />
        )}
        
        {abaSelecionada === 'agendamentos' && (
          <AgendamentosInterface agendamentos={agendamentos} />
        )}
        
        {abaSelecionada === 'clientes' && (
          <ClientesInterface clientes={clientes} />
        )}
        
        {abaSelecionada === 'ia-config' && (
          <ConfiguracaoIA setorAtivo={setorAtivo} setoresDisponiveis={setoresDisponiveis} />
        )}
      </div>
    </div>
  )
}