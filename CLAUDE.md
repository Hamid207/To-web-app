# Tech Stack

| Layer | Texnologiya |
|-------|-------------|
| Build | Vite |
| UI | React + TypeScript |
| Components | Material UI |
| Forms | React Hook Form + Controller |
| Validation | Yup + @hookform/resolvers |
| State | Zustand |
| Server State | React Query |


Layihə Təsviri
Bu layihə Todo Web Application-dır. Əsas məqsəd: istifadəçi task yaradanda həmin task avtomatik olaraq Claude Code CLI vasitəsilə icra olunur.
Arxitektura
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Go Backend    │────▶│  Claude Code    │
│   (React/Web)   │     │   (Fiber API)   │     │  CLI (Max)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
Əsas Axın

İstifadəçi web app-da task yazır (məs: "Fix login bug in auth.go")
Frontend POST request göndərir /api/tasks/run endpoint-inə
Go backend claude --dangerously-skip-permissions -p "task" CLI command-ını çağırır
Claude Code (Max subscription ilə login olunmuş) task-ı icra edir
Nəticə backend-ə qayıdır
Frontend nəticəni göstərir

Texnologiyalar

Frontend: React / Next.js 
AI: Claude Code CLI (Anthropic Max subscription, API key tələb olunmur)
Database: PostgreSQL (task-ları saxlamaq üçün)

Claude Code Konfiqurasiyası
Quraşdırma (server-də bir dəfəlik)
bashnpm install -g @anthropic-ai/claude-code
claude  # login olmaq üçün
claude --dangerously-skip-permissions  # permissions bypass qəbul etmək
CLI İstifadəsi
bashclaude --dangerously-skip-permissions -p "your task here"
API Endpoint-ləri
POST /api/tasks/run
Task-ı Claude Code-da icra edir.
Request:
json{
  "task": "Fix the authentication bug in auth.go",
  "project_dir": "/path/to/project"
}
Response:
json{
  "success": true,
  "output": "Claude Code output here..."
}
Vacib Qeydlər

Claude Code CLI server-də əvvəlcədən login olunmuş olmalıdır
--dangerously-skip-permissions flag-ı istifadə olunur (interaktiv suallar olmadan işləmək üçün)
API key lazım deyil - Max subscription kifayətdir
Task-lar uzun çəkə bilər (30 san - bir neçə dəqiqə), timeout-ları uyğun təyin et

Gələcək İnkişaf (Optional)

 WebSocket ilə real-time output streaming
 Task tarixçəsi və statusları
 Çoxlu layihə dəstəyi
 Task queue sistemi