<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $user = Auth::id();
        $categories = Category::where('user_id', $user)->get();

        return response()->json($categories, 200);
    }

    public function store(Request $request)
    {
        $user = Auth::id();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
        ]);

        $category = Category::create([
            'user_id' => $user,
            $validated['name'],
            $validated['type'],
        ]);

        return response()->json([
            'message' => 'Category created successfully',
            'category' => $category,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::id();

        $category = Category::where('id', $id)->where('user_id', $user)->firstOrFail();

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|in:income,expense',
        ]);

        $category->update($validated);

        return response()->json([
            'message' => 'Category updated successfully',
            'category' => $category,
        ], 200);
    }

    public function destroy($id)
    {
        $user = Auth::id();

        $category = Category::where('id', $id)->where('user_id', $user)->firstOrFail();
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
