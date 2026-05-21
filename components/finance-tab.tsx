"use client"

import { useState } from 'react'
import { Plus, TrendingUp, TrendingDown, Trash2 } from 'lucide-react'

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
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('income')

  const totalBalance = transactions.reduce((acc, t) => {
    return acc + (t.type === 'income' ? t.amount : -t.amount)
  }, 0)

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0 || !description.trim()) return
    
    onAddTransaction({
      amount: numAmount,
      type,
      description: description.trim()
    })
    setAmount('')
    setDescription('')
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

  return (
    <div className="space-y-4">
      {/* Balance Card */}
      <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
        <p className="text-sm opacity-90 mb-1">Total Saldo</p>
        <p className="text-3xl font-bold text-balance">{formatCurrency(totalBalance)}</p>
        <div className="flex gap-4 mt-4 pt-4 border-t border-primary-foreground/20">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-sm opacity-90 mb-0.5">
              <TrendingUp className="w-4 h-4" />
              <span>Pemasukan</span>
            </div>
            <p className="font-semibold">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-sm opacity-90 mb-0.5">
              <TrendingDown className="w-4 h-4" />
              <span>Pengeluaran</span>
            </div>
            <p className="font-semibold">{formatCurrency(totalExpense)}</p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h2 className="font-semibold text-lg mb-4">Tambah Transaksi</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Toggle */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium text-base transition-colors ${
                type === 'income'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              + Pemasukan
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium text-base transition-colors ${
                type === 'expense'
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              - Pengeluaran
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2 text-muted-foreground">
              Nominal (Rp)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-ring"
              min="0"
              inputMode="numeric"
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2 text-muted-foreground">
              Keterangan
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Gaji bulanan"
              className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!amount || !description.trim()}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Simpan Transaksi
          </button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h2 className="font-semibold text-lg mb-4">Riwayat Transaksi</h2>
        {transactions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Belum ada transaksi.<br />Mulai catat keuangan Anda!
          </p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {[...transactions].reverse().map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  transaction.type === 'income' ? 'bg-secondary/20' : 'bg-destructive/20'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-secondary' : 'text-destructive'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Hapus transaksi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
