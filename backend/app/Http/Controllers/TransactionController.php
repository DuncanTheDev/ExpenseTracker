<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::id();
        $query = Transaction::where('user_id', $user)->with('category');

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('transaction_date')) {
            $query->whereDate('transaction_date', $request->transaction_date);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('type', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%")
                    ->orWhere('amount', 'like', "%$search%")
                    ->orWhere('transaction_date', 'like', "%$search%")
                    ->orWhereHas('category', function ($subQ) use ($search) {
                        $subQ->where('name', 'like', "%$search%");
                    });
            });
        }

        $transactions = $query->get();

        return response()->json($transactions, 200);
    }

    public function store(Request $request)
    {
        $user = Auth::id();

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'amount' => 'required|numeric',
            'transaction_date' => 'required|date',
            'type' => 'required|in:income,expense',
        ]);

        $transaction = Transaction::create([
            'user_id' => $user,
            'category_id' => $validated['category_id'],
            'description' => $validated['description'] ?? null,
            'amount' => $validated['amount'],
            'transaction_date' => $validated['transaction_date'],
            'type' => $validated['type'],
        ]);

        return response()->json([
            'message' => 'Transaction created successfully',
            'transaction' => $transaction,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::id();

        $transaction = Transaction::where('id', $id)->where('user_id', $user)->firstOrFail();

        $validated = $request->validate([
            'category_id' => 'sometimes|required|exists:categories,id',
            'description' => 'sometimes|nullable|string',
            'amount' => 'sometimes|required|numeric',
            'transaction_date' => 'sometimes|required|date',
            'type' => 'sometimes|required|in:income,expense',
        ]);

        $transaction->update($validated);

        return response()->json([
            'message' => 'Transaction updated successfully',
            'transaction' => $transaction,
        ], 200);
    }

    public function destroy($id)
    {
        $user = Auth::id();

        $transaction = Transaction::where('id', $id)->where('user_id', $user)->firstOrFail();
        $transaction->delete();

        return response()->json(['message' => 'Transaction deleted successfully'], 200);
    }
}
