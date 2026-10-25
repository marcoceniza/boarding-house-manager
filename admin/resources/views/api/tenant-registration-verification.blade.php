<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Verify your Haven House account</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
    <div class="w-full max-w-md">
        <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50 ring-1 ring-slate-900/5">

            <div class="bg-gradient-to-br from-emerald-700 to-emerald-600 px-6 py-9 text-center">
                <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30">
                    <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-.97 1.84l-7.15 4.09a2.25 2.25 0 0 1-2.26 0L3.97 8.833a2.25 2.25 0 0 1-.97-1.84V6.75" />
                    </svg>
                </div>
                <h1 class="mt-4 text-lg font-semibold tracking-tight text-white sm:text-xl">Verify your email address</h1>
                <p class="mt-1 text-sm text-emerald-50/90">Finish setting up your Haven House tenant account.</p>
            </div>

            <div class="space-y-5 p-6">
                <p class="text-sm leading-6 text-slate-500">
                    We've emailed a verification link to the address you signed up with.
                    Open the link below to activate your account &mdash; it stays valid for
                    <span class="font-semibold text-slate-700">60 minutes</span>.
                </p>

                <div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 shadow-sm">
                    <svg class="shrink-0 h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.03a4.5 4.5 0 0 0-6.036 0l-2.25 2.25a3 3 0 0 0-.878 2.123v3.382a4.5 4.5 0 0 0 3 4.243l2.25.865a3 3 0 0 0 2.25 0l2.25-.865a4.5 4.5 0 0 0 3-4.243V9.126a3 3 0 0 0-.878-2.123l-2.25-2.25a4.5 4.5 0 0 0-6.036 0Z" />
                    </svg>
                    <span class="truncate text-xs text-slate-500">
                        Confirmed by <span class="font-medium text-slate-700">{{ \Illuminate\Support\Str::before(\Illuminate\Support\Str::after($confirmationUrl, '://'), '/') }}</span>
                    </span>
                </div>

                <form method="POST" action="{{ $confirmationUrl }}">
                    <button type="submit" class="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Confirm email &amp; create account
                    </button>
                </form>

                <p class="pt-1 text-center text-xs text-slate-400">
                    Didn't receive it? Check your spam &amp; junk folders, or
                    <a href="{{ route('login') }}" class="font-medium text-emerald-700 underline-offset-2 hover:underline">return to sign in</a>.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
