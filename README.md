# UniSafe Chat

A closed, verified social network for Dev Bhoomi University, Uttarakhand.
Staff post, students comment with name and ERP. Admins review reports and warn, mute or suspend.

## Run locally
```bash
cd frontend
npm install
npm run dev
```

## Demo logins (login = ERP number + date of birth as DDMMYY)
| Role | ERP | Password |
| --- | --- | --- |
| Student | 2024CS001 | 150805 |
| Student | 2024CS002 | 220306 |
| Faculty | FAC001 | 100680 |
| Admin | ADM001 | 010180 |

## Prototype notes
Data is stored in the browser (localStorage), so it is for demos only. The backend comes next.
Do not put real student data in this repository.

## Deploy on Vercel
Import the repo, set **Root Directory** to `frontend`, keep the Vite defaults, and click Deploy.
