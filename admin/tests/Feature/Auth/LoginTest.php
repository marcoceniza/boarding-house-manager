<?php

use App\Models\User;

it('redirects users to the dashboard after a successful login', function () {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ])
        ->assertRedirect('/dashboard');

    $this->assertAuthenticatedAs($user);
});
