"use client"

import { useState } from 'react'
import { Plus, Minus, Wallet, ArrowUpCircle, ArrowDownCircle, Trash2 } from 'lucide-react'

export interface Transaction {
  id: string
  amount: number
  type: 'income' | 'expense'
  description: string
  date: string
}

interface FinanceTabProps {
  transactions: Transaction[]
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void
  onDeleteTransaction: (id: string) => void
}

export function FinanceTab({ transactions, onAddTransaction, onDeleteTransaction }: FinanceTabProps) {
  const [incomeAmount, setIncomeAmount] = useState('')
  const [incomeDesc, setIncomeDesc] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseDesc, setExpenseDesc] = useState('')
  const [showHistory, setShowHistory] = useState(false)

  const totalBalance = transactions.reduce((acc, t) => {
    return acc + (t.type === 'income' ? t.amount : -t.amount)
  }, 0)

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)

  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseFloat(incomeAmount)
    if (isNaN(numAmount) || numAmount <= 0) return
    
    onAddTransaction({
      amount: numAmount,
      type: 'income',
      description: incomeDesc.trim() || 'Uang Masuk'
    })
    setIncomeAmount('')
    setIncomeDesc('')
  }

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseFloat(expenseAmount)
    if (isNaN(numAmount) || numAmount <= 0) return
    
    onAddTransaction({
      amount: numAmount,
      type: 'expense',
      description: expenseDesc.trim() || 'Uang Keluar'
    })
    setExpenseAmount('')
    setExpenseDesc('')
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get recent transactions (last 5)
  const recentTransactions = [...transactions].reverse().slice(0, 5)

  return (
    <div className="space-y-4">
      {/* Main Balance Card - Prominent Display */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-primary-foreground shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm opacity-90">Dompetku</p>
            <p className="text-xs opacity-70">Saldo Saat Ini</p>
          </div>
        </div>
        
        <div className="mt-4 mb-6">
          <p className={`text-4xl font-bold tracking-tight ${totalBalance < 0 ? 'text-red-200' : ''}`}>
            {formatCurrency(totalBalance)}
          </p>
        </div>

        <div className="flex gap-4 pt-4 border-t border-primary-foreground/20">
          <div className="flex-1 flex items-center gap-2">
            <ArrowUpCircle className="w-5 h-5 text-green-200" />
            <div>
              <p className="text-xs opacity-70">Masuk</p>
              <p className="font-semibold text-sm">{formatCurrency(totalIncome)}</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <ArrowDownCircle className="w-5 h-5 text-red-200" />
            <div>
              <p className="text-xs opacity-70">Keluar</p>
              <p className="font-semibold text-sm">{formatCurrency(totalExpense)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Forms - Side by Side on larger screens */}
      <div className="grid gap-4">
        {/* Income Form */}
        <div className="bg-card rounded-2xl p-5 border border-secondary/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Plus className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="font-semibold text-lg text-secondary">Uang Masuk</h2>
          </div>
          <form onSubmit={handleIncomeSubmit} className="space-y-3">
            <div>
              <input
                type="number"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                placeholder="Nominal (Rp)"
                className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-secondary"
                min="0"
                inputMode="numeric"
              />
            </div>
            <div>
              <input
                type="text"
                value={incomeDesc}
                onChange={(e) => setIncomeDesc(e.target.value)}
                placeholder="Keterangan (opsional)"
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <button
              type="submit"
              disabled={!incomeAmount}
              className="w-full bg-secondary text-secondary-foreground py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Tambah Pemasukan
            </button>
          </form>
        </div>

        {/* Expense Form */}
        <div className="bg-card rounded-2xl p-5 border border-destructive/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-destructive/20 flex items-center justify-center">
              <Minus className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-semibold text-lg text-destructive">Uang Keluar</h2>
          </div>
          <form onSubmit={handleExpenseSubmit} className="space-y-3">
            <div>
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="Nominal (Rp)"
                className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-destructive"
                min="0"
                inputMode="numeric"
              />
            </div>
            <div>
              <input
                type="text"
                value={expenseDesc}
                onChange={(e) => setExpenseDesc(e.target.value)}
                placeholder="Keterangan (opsional)"
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-destructive"
              />
            </div>
            <button
              type="submit"
              disabled={!expenseAmount}
              className="w-full bg-destructive text-destructive-foreground py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-5 h-5" />
              Catat Pengeluaran
            </button>
          </form>
        </div>
      </div>

      {/* Transaction History Toggle */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
        >
          <span className="font-semibold">Riwayat Transaksi</span>
          <span className="text-sm text-muted-foreground">
            {transactions.length} transaksi {showHistory ? '▲' : '▼'}
          </span>
        </button>
        
        {showHistory && (
          <div className="border-t border-border p-4">
            {transactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">
                Belum ada transaksi.<br />Mulai catat keuangan Anda!
              </p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      transaction.type === 'income' ? 'bg-secondary/20' : 'bg-destructive/20'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpCircle className="w-5 h-5 text-secondary" />
                      ) : (
                        <ArrowDownCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-semibold text-sm ${
                        transaction.type === 'income' ? 'text-secondary' : 'text-destructive'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                    </div>
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Hapus transaksi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {transactions.length > 5 && (
                  <p className="text-center text-sm text-muted-foreground pt-2">
                    + {transactions.length - 5} transaksi lainnya
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
