<?php

// In app/Http/Requests/UpdateConferenceRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConferenceRequest extends FormRequest
{
    public function authorize()
    {
        $conference = $this->route('conference');
        return auth()->check() && auth()->id() === $conference->user_id;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_time' => 'required|date|after_or_equal:today',
            'end_time' => 'required|date|after:start_time',
            'location' => 'required|string|max:255',
            'attendee_limit' => 'nullable|integer|min:1',
        ];
    }
}

