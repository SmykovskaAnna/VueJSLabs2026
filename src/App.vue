<script setup>
import { provide } from 'vue'
import { auth } from './auth'

provide('auth', auth)
</script>

<template>
  <RouterView />
</template>

<style>
:root {
  font-family: Inter, system-ui, sans-serif;
  color: #172033;
  background: #f3f6fb;
  font-synthesis: none;
}

* { box-sizing: border-box; }
body { margin: 0; min-width: 320px; min-height: 100vh; }
button, input { font: inherit; }
a { color: #4f46e5; text-decoration: none; }
.button {
  display: inline-block;
  border: 0;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  padding: 11px 18px;
  cursor: pointer;
  text-align: center;
}
.button.secondary { background: #e7e9ff; color: #3730a3; }
.button.small { padding: 8px 12px; }
.button.wide { width: 100%; margin-top: 8px; }
.simple-home { min-height: 100vh; padding: 24px; display: grid; place-items: center; background: #f3f6fb; }
.simple-home-card { width: min(420px, 100%); padding: 38px 32px; border: 1px solid #e8ebf3; border-radius: 16px; background: white; text-align: center; box-shadow: 0 12px 36px rgba(28, 39, 76, .08); }
.simple-home-label { margin: 0 0 10px; color: #6366f1; font-size: 11px; font-weight: 700; letter-spacing: 1px; }
.simple-home-card h1 { margin: 0; font-size: 30px; }
.simple-home-description { margin: 10px 0 24px; color: #738096; font-size: 14px; }
.simple-home-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.simple-home-actions .button { padding: 12px; }
.not-found { min-height: 100vh; display: grid; place-content: center; text-align: center; }
.auth-page { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
.auth-card { width: min(440px, 100%); background: white; border-radius: 16px; padding: 32px; box-shadow: 0 12px 40px rgba(28, 39, 76, .12); }
.auth-card h1 { margin: 4px 0 24px; }
.auth-card header { text-align: center; }
.eyebrow { margin: 0; color: #6366f1; font-weight: 700; }
.field { display: grid; gap: 7px; margin-bottom: 16px; }
.field label { font-weight: 700; font-size: 14px; }
.field input { width: 100%; border: 1px solid #ccd3df; border-radius: 8px; padding: 10px 12px; }
.field input:focus { outline: 2px solid #c7d2fe; border-color: #6366f1; }
.field-error { color: #c53030; margin: 0; font-size: 13px; }
.auth-footer { margin-top: 20px; text-align: center; font-size: 14px; }
.success { color: #16803d; }
.admin-shell { min-height: 100vh; display: grid; grid-template-columns: 238px 1fr; background: #f7f7fc; }
.sidebar { position: relative; min-height: 100vh; padding: 27px 18px; display: flex; flex-direction: column; border-right: 1px solid #eeedf5; background: #fff; }
.sidebar .brand { display: flex; align-items: center; gap: 11px; color: #24213a; font-size: 16px; font-weight: 800; margin: 0 0 42px; }
.nav-caption { margin: 0 0 10px 12px; color: #a3a0b3; font-size: 10px; font-weight: 800; letter-spacing: 1.3px; }
.sidebar nav { display: grid; gap: 6px; }
.sidebar nav a { display: flex; align-items: center; gap: 12px; color: #77758b; padding: 11px 12px; border-radius: 9px; font-size: 13px; font-weight: 600; transition: background .16s, color .16s; }
.sidebar nav a:hover { color: #5e50d5; background: #f7f5ff; }
.sidebar nav a.active { color: #5d4fd4; background: #f0edff; }
.admin-content { min-width: 0; }
.topbar { height: 68px; background: rgba(255,255,255,.9); border-bottom: 1px solid #eeedf5; display: flex; align-items: center; justify-content: flex-end; gap: 16px; padding: 0 28px; }
.current-user { display: grid; text-align: right; }
.current-user span { color: #738096; font-size: 13px; }
.logout-button { border-radius: 8px; background: #f0edff; color: #5d4fd4; }
.logout-button:hover { background: #e8e3ff; }
.page { padding: 28px; }
.stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.stat-card { background: white; border-radius: 12px; padding: 20px; display: grid; gap: 8px; box-shadow: 0 4px 16px rgba(28, 39, 76, .06); }
.stat-card strong { font-size: 28px; }
.table-wrap { overflow-x: auto; background: white; border-radius: 12px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 14px; text-align: left; border-bottom: 1px solid #edf0f5; }
.detail-card { background: white; border-radius: 12px; padding: 20px; max-width: 600px; }
.reports-heading { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
.reports-eyebrow { margin: 0 0 7px; color: #6259d9; font-size: 11px; font-weight: 800; letter-spacing: 1.2px; }
.reports-heading h1 { margin: 0; }
.reports-intro { margin: 7px 0 0; color: #778197; }
.reports-count { padding: 8px 12px; border: 1px solid #e5e7f0; border-radius: 20px; background: white; color: #657087; font-size: 12px; }
.reports-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.report-card { min-height: 150px; padding: 16px; display: flex; flex-direction: column; border: 1px solid #e9ebf3; border-radius: 12px; background: white; box-shadow: 0 4px 15px rgba(28, 39, 76, .035); transition: transform .18s, box-shadow .18s; }
.report-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(28, 39, 76, .08); }
.report-card h2 { margin: 4px 0 7px; font-size: 15px; }
.report-description { margin: 0; color: #778197; font-size: 13px; line-height: 1.55; }
@media (max-width: 700px) {
  .admin-shell { grid-template-columns: 1fr; }
  .sidebar { min-height: auto; padding: 14px 16px; display: block; border-right: 0; border-bottom: 1px solid #eeedf5; }
  .sidebar .brand { margin: 0 0 12px; }
  .nav-caption { display: none; }
  .sidebar nav { display: flex; gap: 5px; overflow-x: auto; }
  .sidebar nav a { white-space: nowrap; padding: 9px 10px; }
  .stats { grid-template-columns: 1fr; }
  .topbar { padding: 0 16px; }
  .page { padding: 20px 16px; }
  .reports-heading { align-items: start; }
}
</style>
