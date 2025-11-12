'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Phone, Mail, CheckCircle, AlertCircle, XCircle, Plus } from 'lucide-react'

interface Agendamento {
  id: string
  cliente: string
  servico: string
  data: Date
  status: 'confirmado' | 'pendente' | 'cancelado'
  canal: string
}

interface AgendamentosInterfaceProps {
  agendamentos: Agendamento[]
}

export function AgendamentosInterface({ agendamentos }: AgendamentosInterfaceProps) {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [novoAgendamento, setNovoAgendamento] = useState({
    cliente: '',
    servico: '',
    data: '',
    hora: ''
  })

  const agendamentosFiltrados = agendamentos.filter(agendamento => 
    filtroStatus === 'todos' || agendamento.status === filtroStatus
  )

  const getIconeStatus = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
      case 'pendente':
        return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
      case 'cancelado':
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
      default:
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
    }
  }

  const getCorStatus = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Novo agendamento:', novoAgendamento)
    setMostrarFormulario(false)
    setNovoAgendamento({ cliente: '', servico: '', data: '', hora: '' })
  }

  const servicosDisponiveis = [
    'Corte Masculino',
    'Corte + Barba',
    'Barba',
    'Escova',
    'Hidratação',
    'Progressiva',
    'Coloração',
    'Instalação Elétrica',
    'Manutenção',
    'Emergência'
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header com Filtros */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Agendamentos</h2>
            <p className="text-sm sm:text-base text-gray-600">Gerencie todos os agendamentos do sistema</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos os Status</option>
              <option value="confirmado">Confirmados</option>
              <option value="pendente">Pendentes</option>
              <option value="cancelado">Cancelados</option>
            </select>
            
            <button
              onClick={() => setMostrarFormulario(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Novo Agendamento</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-2 sm:mb-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Confirmados</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {agendamentos.filter(a => a.status === 'confirmado').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
            <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mb-2 sm:mb-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {agendamentos.filter(a => a.status === 'pendente').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2 sm:mb-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Hoje</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {agendamentos.filter(a => 
                  new Date(a.data).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Agendamentos - Mobile Cards / Desktop Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Lista de Agendamentos ({agendamentosFiltrados.length})
          </h3>
        </div>
        
        {/* Mobile Cards */}
        <div className="lg:hidden divide-y">
          {agendamentosFiltrados.map(agendamento => (
            <div key={agendamento.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{agendamento.cliente}</span>
                </div>
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getCorStatus(agendamento.status)}`}>
                  {getIconeStatus(agendamento.status)}
                  <span className="capitalize">{agendamento.status}</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Serviço:</span>
                  <span>{agendamento.servico}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{agendamento.data.toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 text-gray-400 ml-2" />
                  <span>{agendamento.data.toLocaleTimeString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Canal:</span>
                  <span className="capitalize">{agendamento.canal}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3 pt-3 border-t">
                <button className="flex-1 text-xs sm:text-sm text-blue-600 hover:text-blue-900 py-1">
                  Editar
                </button>
                <button className="flex-1 text-xs sm:text-sm text-green-600 hover:text-green-900 py-1">
                  Confirmar
                </button>
                <button className="flex-1 text-xs sm:text-sm text-red-600 hover:text-red-900 py-1">
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serviço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Canal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agendamentosFiltrados.map(agendamento => (
                <tr key={agendamento.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-8 h-8 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {agendamento.cliente}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agendamento.servico}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{agendamento.data.toLocaleDateString()}</span>
                      <Clock className="w-4 h-4 text-gray-400 ml-2" />
                      <span>{agendamento.data.toLocaleTimeString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getCorStatus(agendamento.status)}`}>
                      {getIconeStatus(agendamento.status)}
                      <span className="capitalize">{agendamento.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="capitalize">{agendamento.canal}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        Editar
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Confirmar
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Novo Agendamento */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Novo Agendamento
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente
                </label>
                <input
                  type="text"
                  value={novoAgendamento.cliente}
                  onChange={(e) => setNovoAgendamento(prev => ({ ...prev, cliente: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serviço
                </label>
                <select
                  value={novoAgendamento.servico}
                  onChange={(e) => setNovoAgendamento(prev => ({ ...prev, servico: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione um serviço</option>
                  {servicosDisponiveis.map(servico => (
                    <option key={servico} value={servico}>{servico}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data
                  </label>
                  <input
                    type="date"
                    value={novoAgendamento.data}
                    onChange={(e) => setNovoAgendamento(prev => ({ ...prev, data: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora
                  </label>
                  <input
                    type="time"
                    value={novoAgendamento.hora}
                    onChange={(e) => setNovoAgendamento(prev => ({ ...prev, hora: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}