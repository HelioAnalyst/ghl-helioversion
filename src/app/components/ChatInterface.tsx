'use client'

import { useState } from 'react'
import { MessageSquare, Send, Bot, User, Phone, Mail, Instagram, Facebook, Zap, ArrowLeft } from 'lucide-react'

interface Conversa {
  id: string
  cliente: string
  canal: 'whatsapp' | 'instagram' | 'facebook' | 'sms' | 'email'
  ultimaMensagem: string
  timestamp: Date
  status: 'ativo' | 'pendente' | 'resolvido'
  setor: string
}

interface Mensagem {
  id: string
  remetente: 'cliente' | 'ia' | 'humano'
  conteudo: string
  timestamp: Date
  canal: string
}

interface ChatInterfaceProps {
  conversas: Conversa[]
  setorAtivo: string
}

const respostasIA = {
  barbearia: [
    "Olá! Sou o assistente da barbearia. Como posso ajudar você hoje?",
    "Claro! Temos horários disponíveis amanhã às 14h e 16h. Qual prefere?",
    "Perfeito! Vou agendar seu corte + barba para amanhã às 14h. Confirmo por WhatsApp!"
  ],
  salao: [
    "Oi, querida! Bem-vinda ao nosso salão. Em que posso ajudá-la?",
    "A escova progressiva custa R$ 180. Temos disponibilidade na sexta-feira. Te interessa?",
    "Maravilha! Agendei sua escova para sexta às 9h. Você receberá confirmação por SMS!"
  ],
  eletricista: [
    "Olá! Sou o assistente técnico. Qual o problema elétrico que você está enfrentando?",
    "Entendi. Posso enviar um eletricista hoje às 15h para uma avaliação. Confirma?",
    "Agendado! O técnico João estará aí hoje às 15h. Você receberá os dados por email."
  ]
}

export function ChatInterface({ conversas, setorAtivo }: ChatInterfaceProps) {
  const [conversaSelecionada, setConversaSelecionada] = useState<string | null>(null)
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: '1',
      remetente: 'cliente',
      conteudo: 'Oi, gostaria de agendar um horário',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      canal: 'whatsapp'
    },
    {
      id: '2',
      remetente: 'ia',
      conteudo: respostasIA[setorAtivo as keyof typeof respostasIA]?.[0] || 'Olá! Como posso ajudar?',
      timestamp: new Date(Date.now() - 1000 * 60 * 9),
      canal: 'whatsapp'
    },
    {
      id: '3',
      remetente: 'cliente',
      conteudo: 'Preciso para amanhã se possível',
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      canal: 'whatsapp'
    },
    {
      id: '4',
      remetente: 'ia',
      conteudo: respostasIA[setorAtivo as keyof typeof respostasIA]?.[1] || 'Vou verificar a disponibilidade.',
      timestamp: new Date(Date.now() - 1000 * 60 * 7),
      canal: 'whatsapp'
    }
  ])
  const [novaMensagem, setNovaMensagem] = useState('')
  const [mostrarChat, setMostrarChat] = useState(false)

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

  const enviarMensagem = () => {
    if (!novaMensagem.trim()) return

    const mensagemCliente: Mensagem = {
      id: Date.now().toString(),
      remetente: 'humano',
      conteudo: novaMensagem,
      timestamp: new Date(),
      canal: 'whatsapp'
    }

    setMensagens(prev => [...prev, mensagemCliente])
    setNovaMensagem('')

    // Simular resposta da IA após 2 segundos
    setTimeout(() => {
      const respostaIA: Mensagem = {
        id: (Date.now() + 1).toString(),
        remetente: 'ia',
        conteudo: 'Mensagem processada pela IA. Como posso ajudar mais?',
        timestamp: new Date(),
        canal: 'whatsapp'
      }
      setMensagens(prev => [...prev, respostaIA])
    }, 2000)
  }

  const selecionarConversa = (id: string) => {
    setConversaSelecionada(id)
    setMostrarChat(true)
  }

  const voltarParaLista = () => {
    setMostrarChat(false)
    setConversaSelecionada(null)
  }

  return (
    <div className="h-[calc(100vh-12rem)] sm:h-[600px]">
      {/* Layout Mobile: Stack vertical */}
      <div className="lg:hidden h-full">
        {!mostrarChat ? (
          /* Lista de Conversas - Mobile */
          <div className="bg-white rounded-xl shadow-sm h-full flex flex-col">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Conversas Ativas</h3>
              <p className="text-sm text-gray-600">{conversas.length} conversas</p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {conversas.map(conversa => (
                <div
                  key={conversa.id}
                  onClick={() => selecionarConversa(conversa.id)}
                  className="p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 active:bg-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getIconeCanal(conversa.canal)}
                      <span className="font-medium text-gray-900">{conversa.cliente}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      conversa.status === 'ativo' 
                        ? 'bg-green-100 text-green-800'
                        : conversa.status === 'pendente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {conversa.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-1">{conversa.ultimaMensagem}</p>
                  <p className="text-xs text-gray-500">
                    {conversa.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Chat Interface - Mobile */
          <div className="bg-white rounded-xl shadow-sm h-full flex flex-col">
            {/* Header do Chat - Mobile */}
            <div className="p-4 border-b bg-gray-50 flex items-center space-x-3">
              <button
                onClick={voltarParaLista}
                className="p-1 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {conversas.find(c => c.id === conversaSelecionada)?.cliente}
                </h4>
                <div className="flex items-center space-x-2">
                  {getIconeCanal(conversas.find(c => c.id === conversaSelecionada)?.canal || 'whatsapp')}
                  <span className="text-sm text-gray-600">
                    {conversas.find(c => c.id === conversaSelecionada)?.canal}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600 font-medium">IA</span>
              </div>
            </div>

            {/* Mensagens - Mobile */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mensagens.map(mensagem => (
                <div
                  key={mensagem.id}
                  className={`flex ${mensagem.remetente === 'cliente' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] px-3 py-2 rounded-lg ${
                    mensagem.remetente === 'cliente'
                      ? 'bg-gray-100 text-gray-900'
                      : mensagem.remetente === 'ia'
                      ? 'bg-blue-600 text-white'
                      : 'bg-green-600 text-white'
                  }`}>
                    <div className="flex items-center space-x-1 mb-1">
                      {mensagem.remetente === 'ia' && <Bot className="w-3 h-3" />}
                      {mensagem.remetente === 'cliente' && <User className="w-3 h-3" />}
                      {mensagem.remetente === 'humano' && <User className="w-3 h-3" />}
                      <span className="text-xs opacity-75">
                        {mensagem.remetente === 'ia' ? 'IA' : mensagem.remetente === 'cliente' ? 'Cliente' : 'Você'}
                      </span>
                    </div>
                    <p className="text-sm">{mensagem.conteudo}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {mensagem.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de Mensagem - Mobile */}
            <div className="p-4 border-t">
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={enviarMensagem}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <span>IA respondendo</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
                
                <button className="text-blue-600 hover:text-blue-800">
                  Assumir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Layout Desktop: Grid lado a lado */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6 h-full">
        {/* Lista de Conversas - Desktop */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-900">Conversas Ativas</h3>
            <p className="text-sm text-gray-600">{conversas.length} conversas</p>
          </div>
          
          <div className="overflow-y-auto h-full">
            {conversas.map(conversa => (
              <div
                key={conversa.id}
                onClick={() => setConversaSelecionada(conversa.id)}
                className={`p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 ${
                  conversaSelecionada === conversa.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getIconeCanal(conversa.canal)}
                    <span className="font-medium text-gray-900">{conversa.cliente}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    conversa.status === 'ativo' 
                      ? 'bg-green-100 text-green-800'
                      : conversa.status === 'pendente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {conversa.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conversa.ultimaMensagem}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {conversa.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface - Desktop */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm flex flex-col">
          {conversaSelecionada ? (
            <>
              {/* Header do Chat - Desktop */}
              <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {conversas.find(c => c.id === conversaSelecionada)?.cliente}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {getIconeCanal(conversas.find(c => c.id === conversaSelecionada)?.canal || 'whatsapp')}
                      <span className="text-sm text-gray-600">
                        {conversas.find(c => c.id === conversaSelecionada)?.canal}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">IA Ativa</span>
                </div>
              </div>

              {/* Mensagens - Desktop */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mensagens.map(mensagem => (
                  <div
                    key={mensagem.id}
                    className={`flex ${mensagem.remetente === 'cliente' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      mensagem.remetente === 'cliente'
                        ? 'bg-gray-100 text-gray-900'
                        : mensagem.remetente === 'ia'
                        ? 'bg-blue-600 text-white'
                        : 'bg-green-600 text-white'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {mensagem.remetente === 'ia' && <Bot className="w-4 h-4" />}
                        {mensagem.remetente === 'cliente' && <User className="w-4 h-4" />}
                        {mensagem.remetente === 'humano' && <User className="w-4 h-4" />}
                        <span className="text-xs opacity-75">
                          {mensagem.remetente === 'ia' ? 'IA' : mensagem.remetente === 'cliente' ? 'Cliente' : 'Você'}
                        </span>
                      </div>
                      <p className="text-sm">{mensagem.conteudo}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {mensagem.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input de Mensagem - Desktop */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={enviarMensagem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>IA respondendo automaticamente</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Online</span>
                    </div>
                  </div>
                  
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Assumir conversa
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecione uma conversa
                </h3>
                <p className="text-gray-600">
                  Escolha uma conversa da lista para começar a interagir
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}