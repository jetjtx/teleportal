<template>
<div class="min-w-[11rem] text-gray-300">
    <h1 class="text-base font-bold px-5 py-3">CheckIn Jobs</h1>
    <div class="grid mt-3 text-sm px-2">
        <RouterLink class="px-4 py-1.5 hover:text-gray-200" to="/admin/dashboard">Dashboard</RouterLink>
        <RouterLink class="px-4 py-1.5 hover:text-gray-200" to="/admin/posts">Posts</RouterLink>
        <RouterLink class="px-4 py-1.5 hover:text-gray-200" to="/admin/reject">Reject</RouterLink>
        <RouterLink class="px-4 py-1.5 hover:text-gray-200" to="/admin/approve">Approve</RouterLink>
        <RouterLink class="px-4 py-1.5 hover:text-gray-200" to="/admin/settings">Settings</RouterLink>
        <RouterLink class="px-4 py-1.5 hover:text-gray-200 mt-10" to="/admin/signin">Sign Out</RouterLink>
    </div>
</div>
</template>