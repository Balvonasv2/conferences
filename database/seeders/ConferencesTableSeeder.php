<?php

namespace Database\Seeders;

use App\Models\Conference;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ConferencesTableSeeder extends Seeder
{
    //Initial seed
    public function run(): void
    {
        Conference::create([
            'title' => 'VilniusTech Online Conference',
            'description' => 'This conference is dedicated to celebrate our 1000 year anniversary.',
            'start_time' => Carbon::createFromFormat('Y-m-d H:i', '2023-12-05 10:00'),
            'end_time' => Carbon::createFromFormat('Y-m-d H:i', '2023-12-05 11:30'),
            'location' => 'Virtual',
            'attendee_limit' => 1000
        ]);

        Conference::create([
            'title' => 'Laravel exam',
            'description' => 'During this meeting we will be tested for our knowledge',
            'start_time' => Carbon::createFromFormat('Y-m-d H:i', '2023-12-14 9:00'),
            'end_time' => Carbon::createFromFormat('Y-m-d H:i', '2023-12-14 11:00'),
            'location' => 'Live',
            'attendee_limit' => 20
        ]);

        Conference::create([
            'title' => 'Time Off',
            'description' => 'I will not be available during this time, please contact my manager if urgent',
            'start_time' => Carbon::createFromFormat('Y-m-d H:i', '2023-12-31 17:00'),
            'end_time' => Carbon::createFromFormat('Y-m-d H:i', '2024-01-01 9:00'),
            'location' => 'OOF',
            'attendee_limit' => 1
        ]);
    }
}
