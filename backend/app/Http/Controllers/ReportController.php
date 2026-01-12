<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function monthlyIncomeExpense()
    {
        $user = Auth::id();

        $monthlyData = [];

        for ($month = 1; $month <= 12; $month++) {
            $income = Transaction::where('user_id', $user)
                ->whereMonth('transaction_date', $month)
                ->where('type', 'income')
                ->sum('amount');

            $expense = Transaction::where('user_id', $user)
                ->whereMonth('transaction_date', $month)
                ->where('type', 'expense')
                ->sum('amount');

            $max = max($income, $expense, 1);
            $incomePercent =  round(($income / $max) * 100, 2);
            $expensePercent = round(($expense / $max) * 100, 2);

            $monthlyData[] = [
                "month"   => date("M", mktime(0, 0, 0, $month, 1)),
                "income"  => $incomePercent,
                "expense" => $expensePercent,
                "raw" => [
                    "income" => $income,
                    "expense" => $expense,
                ]
            ];
        }

        return response()->json($monthlyData);
    }

    public function balanceTrend()
    {
        $user = Auth::id();

        $data = collect(range(1, 12))->map(function ($month,) use ($user) {
            $income = Transaction::where('user_id', $user)
                ->whereMonth('transaction_date', $month)
                ->where('type', 'income')
                ->sum('amount');

            $expense = Transaction::where('user_id', $user)
                ->whereMonth('transaction_date', $month)
                ->where('type', 'expense')
                ->sum('amount');

            return [
                'month' => date("M", mktime(0, 0, 0, $month, 1)),
                'balance' => $income - $expense
            ];
        });

        return response()->json($data);
    }

    public function categoryBreakdown()
    {
        $user = Auth::id();

        $totalAmount = Transaction::where('user_id', $user)->sum('amount');

        $data = Transaction::where('user_id', $user)
            ->with('category')
            ->selectRaw('category_id, SUM(amount) as total_amount')
            ->groupBy('category_id')
            ->get()
            ->map(function ($transaction) use ($totalAmount) {
                return [
                    'category_name' => $transaction->category->name,
                    'type' => $transaction->category->type,
                    'total_amount' => $transaction->total_amount,
                    'percentage' => $totalAmount > 0 ? round(($transaction->total_amount / $totalAmount) * 100, 2) : 0
                ];
            });

        return response()->json($data);
    }
}
