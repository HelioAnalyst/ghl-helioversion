'use client'

import { useState } from 'react'
import { Users, Phone, Mail, Calendar, Search, Plus, Edit, Trash2, MessageSquare } from 'lucide-react'

interface Cliente {
  id: string
  nome: string
  telefone: string
  email: string
  consentimento: boolean
  ultimoContato: Date
  totalAgendamentos: number
}

interface ClientesInterfaceProps {
  clientes: Cliente[]
}

export function ClientesInterface({ clientes }: ClientesInterfaceProps) {
  const [busca, setBusca] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    telefone: '',
    email: '',
    consentimento: false
  })

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.telefone.includes(busca) ||
    cliente.email.toLowerCase().includes(busca.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Novo cliente:', novoCliente)
    setMostrarFormulario(false)
    setNovoCliente({ nome: '', telefone: '', email: '', consentimento: false })
  }

  const iniciarConversa = (cliente: Cliente) => {
    console.log('Iniciando conversa com:', cliente.nome)
    // Aqui integraria com o sistema de chat
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header com Busca */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Clientes</h2>
            <p className="text-sm sm:text-base text-gray-600">Gerencie sua base de clientes</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Buscar clientes..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-9 sm:pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
            </div>
            
            <button
              onClick={() => setMostrarFormulario(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Novo Cliente</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2 sm:mb-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Clientes</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{clientes.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-2 sm:mb-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Com Consentimento</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {clientes.filter(c => c.consentimento).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mb-2 sm:mb-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Agendamentos</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {clientes.reduce((total, cliente) => total + cliente.totalAgendamentos, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
            <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mb-2 sm:mb-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Ativos Hoje</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {clientes.filter(c => 
                  new Date(c.ultimoContato).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Clientes - Mobile Cards / Desktop Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Lista de Clientes ({clientesFiltrados.length})
          </h3>
        </div>
        
        {/* Mobile Cards */}
        <div className="lg:hidden divide-y">
          {clientesFiltrados.map(cliente => (
            <div key={cliente.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-sm">
                    {cliente.nome.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{cliente.nome}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      cliente.consentimento
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {cliente.consentimento ? 'Consentimento' : 'Sem consentimento'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{cliente.telefone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{cliente.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{cliente.totalAgendamentos} agendamentos</span>
                  </div>
                  <span className="text-xs">
                    Último: {cliente.ultimoContato.toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-3 border-t">
                <button
                  onClick={() => iniciarConversa(cliente)}
                  className="flex-1 flex items-center justify-center space-x-1 text-xs sm:text-sm text-blue-600 hover:text-blue-900 py-1"
                >
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => setClienteSelecionado(cliente)}
                  className="flex-1 flex items-center justify-center space-x-1 text-xs sm:text-sm text-green-600 hover:text-green-900 py-1"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Editar</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-1 text-xs sm:text-sm text-red-600 hover:text-red-900 py-1">
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Excluir</span>
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
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agendamentos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Consentimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientesFiltrados.map(cliente => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {cliente.nome.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {cliente.nome}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-900">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{cliente.telefone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{cliente.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{cliente.totalAgendamentos}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.ultimoContato.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cliente.consentimento
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {cliente.consentimento ? 'Sim' : 'Não'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => iniciarConversa(cliente)}
                        className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Chat</span>
                      </button>
                      <button
                        onClick={() => setClienteSelecionado(cliente)}
                        className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Editar</span>
                      </button>
                      <button className="text-red-600 hover:text-red-900 flex items-center space-x-1">
                        <Trash2 className="w-4 h-4" />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Novo Cliente */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Novo Cliente
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={novoCliente.nome}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, nome: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={novoCliente.telefone}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, telefone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={novoCliente.email}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="consentimento"
                  checked={novoCliente.consentimento}
                  onChange={(e) => setNovoCliente(prev => ({ ...prev, consentimento: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="consentimento" className="text-sm text-gray-700">
                  Cliente consente receber SMS e emails
                </label>
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
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}