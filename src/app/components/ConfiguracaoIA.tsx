'use client'

import { useState } from 'react'
import { Brain, Settings, MessageSquare, Clock, Zap, Save, RefreshCw } from 'lucide-react'

interface Setor {
  id: string
  nome: string
  cor: string
}

interface ConfiguracaoIAProps {
  setorAtivo: string
  setoresDisponiveis: Setor[]
}

const configuracoesIA = {
  barbearia: {
    tom: 'Descontraído e amigável',
    saudacao: 'E aí, beleza? Sou o assistente da barbearia! Como posso te ajudar hoje?',
    faqs: [
      { pergunta: 'Qual o preço do corte?', resposta: 'O corte masculino custa R$ 25 e o corte + barba R$ 35.' },
      { pergunta: 'Vocês atendem sem agendamento?', resposta: 'Sim, mas recomendamos agendar para garantir seu horário!' },
      { pergunta: 'Quais formas de pagamento?', resposta: 'Aceitamos dinheiro, cartão e PIX.' }
    ],
    servicos: ['Corte Masculino - R$ 25', 'Corte + Barba - R$ 35', 'Apenas Barba - R$ 15'],
    horarios: 'Segunda a Sábado: 8h às 18h',
    agendamento: 'Automático com confirmação por WhatsApp'
  },
  salao: {
    tom: 'Elegante e acolhedor',
    saudacao: 'Olá, querida! Bem-vinda ao nosso salão. Como posso realçar sua beleza hoje?',
    faqs: [
      { pergunta: 'Fazem progressiva?', resposta: 'Sim! Nossa progressiva custa R$ 180 e dura até 4 meses.' },
      { pergunta: 'Atendem aos domingos?', resposta: 'Aos domingos atendemos apenas com agendamento prévio.' },
      { pergunta: 'Têm produtos para venda?', resposta: 'Sim, trabalhamos com as melhores marcas profissionais.' }
    ],
    servicos: ['Escova - R$ 45', 'Hidratação - R$ 60', 'Progressiva - R$ 180', 'Coloração - R$ 120'],
    horarios: 'Segunda a Sábado: 9h às 19h | Domingo: 9h às 15h',
    agendamento: 'Confirmação por SMS e email com lembrete 24h antes'
  },
  eletricista: {
    tom: 'Profissional e técnico',
    saudacao: 'Olá! Sou o assistente técnico. Qual problema elétrico você está enfrentando?',
    faqs: [
      { pergunta: 'Atendem emergências?', resposta: 'Sim, temos plantão 24h para emergências com taxa adicional.' },
      { pergunta: 'Fazem orçamento?', resposta: 'Orçamento gratuito! Nosso técnico avalia no local.' },
      { pergunta: 'Têm garantia?', resposta: 'Todos os serviços têm garantia de 90 dias.' }
    ],
    servicos: ['Instalação Elétrica', 'Manutenção Preventiva', 'Emergência 24h', 'Automação Residencial'],
    horarios: 'Segunda a Sexta: 8h às 17h | Emergências: 24h',
    agendamento: 'Agendamento com janela de 2h e confirmação por telefone'
  }
}

export function ConfiguracaoIA({ setorAtivo, setoresDisponiveis }: ConfiguracaoIAProps) {
  const [abaSelecionada, setAbaSelecionada] = useState('geral')
  const [configuracao, setConfiguracao] = useState(configuracoesIA[setorAtivo as keyof typeof configuracoesIA])
  const [salvando, setSalvando] = useState(false)

  const salvarConfiguracoes = async () => {
    setSalvando(true)
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSalvando(false)
    console.log('Configurações salvas:', configuracao)
  }

  const resetarConfiguracoes = () => {
    setConfiguracao(configuracoesIA[setorAtivo as keyof typeof configuracoesIA])
  }

  const setorAtual = setoresDisponiveis.find(s => s.id === setorAtivo)

  const abas = [
    { id: 'geral', nome: 'Geral', nomeCompleto: 'Configurações Gerais', icone: Settings },
    { id: 'conversas', nome: 'Conversas', nomeCompleto: 'Conversas & Tom', icone: MessageSquare },
    { id: 'agendamentos', nome: 'Agenda', nomeCompleto: 'Agendamentos', icone: Clock },
    { id: 'integracao', nome: 'Integração', nomeCompleto: 'Integrações', icone: Zap }
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${setorAtual?.cor} rounded-xl flex items-center justify-center`}>
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Configuração da IA</h2>
              <p className="text-sm sm:text-base text-gray-600">Personalize a IA para {setorAtual?.nome}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">IA Treinada</span>
          </div>
        </div>
      </div>

      {/* Navegação das Abas */}
      <div className="bg-white rounded-xl shadow-sm">
        {/* Mobile Tabs - Horizontal Scroll */}
        <div className="sm:hidden border-b">
          <nav className="flex space-x-1 px-4 overflow-x-auto">
            {abas.map(aba => {
              const Icone = aba.icone
              return (
                <button
                  key={aba.id}
                  onClick={() => setAbaSelecionada(aba.id)}
                  className={`flex items-center space-x-2 py-3 px-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    abaSelecionada === aba.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icone className="w-4 h-4" />
                  <span>{aba.nome}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden sm:block border-b">
          <nav className="flex space-x-8 px-6">
            {abas.map(aba => {
              const Icone = aba.icone
              return (
                <button
                  key={aba.id}
                  onClick={() => setAbaSelecionada(aba.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    abaSelecionada === aba.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icone className="w-4 h-4" />
                  <span>{aba.nomeCompleto}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {/* Aba Geral */}
          {abaSelecionada === 'geral' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Negócio</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horários de Funcionamento
                    </label>
                    <textarea
                      value={configuracao.horarios}
                      onChange={(e) => setConfiguracao(prev => ({ ...prev, horarios: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serviços e Preços
                    </label>
                    <div className="space-y-2">
                      {configuracao.servicos.map((servico, index) => (
                        <input
                          key={index}
                          type="text"
                          value={servico}
                          onChange={(e) => {
                            const novosServicos = [...configuracao.servicos]
                            novosServicos[index] = e.target.value
                            setConfiguracao(prev => ({ ...prev, servicos: novosServicos }))
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba Conversas */}
          {abaSelecionada === 'conversas' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tom de Voz e Personalidade</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estilo de Comunicação
                    </label>
                    <input
                      type="text"
                      value={configuracao.tom}
                      onChange={(e) => setConfiguracao(prev => ({ ...prev, tom: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem de Saudação
                    </label>
                    <textarea
                      value={configuracao.saudacao}
                      onChange={(e) => setConfiguracao(prev => ({ ...prev, saudacao: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Perguntas Frequentes</h3>
                <div className="space-y-4">
                  {configuracao.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Pergunta"
                          value={faq.pergunta}
                          onChange={(e) => {
                            const novasFaqs = [...configuracao.faqs]
                            novasFaqs[index].pergunta = e.target.value
                            setConfiguracao(prev => ({ ...prev, faqs: novasFaqs }))
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                          placeholder="Resposta"
                          value={faq.resposta}
                          onChange={(e) => {
                            const novasFaqs = [...configuracao.faqs]
                            novasFaqs[index].resposta = e.target.value
                            setConfiguracao(prev => ({ ...prev, faqs: novasFaqs }))
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Aba Agendamentos */}
          {abaSelecionada === 'agendamentos' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações de Agendamento</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Política de Agendamento
                    </label>
                    <textarea
                      value={configuracao.agendamento}
                      onChange={(e) => setConfiguracao(prev => ({ ...prev, agendamento: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Antecedência Mínima
                      </label>
                      <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>30 minutos</option>
                        <option>1 hora</option>
                        <option>2 horas</option>
                        <option>1 dia</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duração Padrão
                      </label>
                      <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>30 minutos</option>
                        <option>45 minutos</option>
                        <option>1 hora</option>
                        <option>1h30min</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba Integrações */}
          {abaSelecionada === 'integracao' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Canais Ativos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { nome: 'WhatsApp Business', status: true, cor: 'green' },
                    { nome: 'Instagram', status: true, cor: 'pink' },
                    { nome: 'Facebook Messenger', status: false, cor: 'blue' },
                    { nome: 'SMS (Twilio)', status: true, cor: 'orange' },
                    { nome: 'Email (SendGrid)', status: true, cor: 'gray' },
                    { nome: 'Google Calendar', status: true, cor: 'blue' }
                  ].map(canal => (
                    <div key={canal.nome} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 bg-${canal.cor}-500 rounded-full`}></div>
                        <span className="font-medium text-gray-900 text-sm">{canal.nome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs sm:text-sm ${canal.status ? 'text-green-600' : 'text-gray-500'}`}>
                          {canal.status ? 'Conectado' : 'Desconectado'}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${canal.status ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
          <button
            onClick={resetarConfiguracoes}
            className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Resetar</span>
          </button>
          
          <button
            onClick={salvarConfiguracoes}
            disabled={salvando}
            className="flex items-center justify-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{salvando ? 'Salvando...' : 'Salvar Configurações'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}