# Техник хангамжийн лаб

8-р ангийн Мэдээллийн технологийн хичээл «Оруулах, гаргах ба санах байгууламжийн техникийн үзүүлэлт»-д зориулсан вэб апп. Зөвхөн HTML, CSS, JavaScript ашигласан тул сервер, сан хэрэггүй.

## Аппын хэсгүүд

| Таб | Үүрэг |
|---|---|
| Явц | Хичээлийн 8 үе шат, үе шат бүрийн таймер |
| Ангилах | 15 төхөөрөмжийг оруулах, гаргах, санах гэж ангилах тоглоом |
| Үзүүлэлт | DPI, Hz, ms, GB/TB, MB/s нэгжүүд; хурдны уралдаан; нягтралын харьцуулалт |
| Сугалаа | 6 кэйсийн сугалаа, Gemini-д хуулах промпт |
| Харьцуулах | Манай компьютер ба AI-ийн саналыг харьцуулах хүснэгт |
| Тест | 10 асуулттай тест, тайлбар, оноо |

## Файлын бүтэц

```
tehnik-hangamj-lab/
├── index.html      ← хуудасны бүтэц (HTML)
├── css/style.css   ← загвар, өнгө (CSS)
├── js/app.js       ← үйлдэл, тоглоом, тест (JavaScript)
├── favicon.svg     ← хөтчийн табын дүрс
└── render.yaml     ← Render-ийн тохиргоо
```

## Компьютер дээрээ нээх

`index.html` файлыг Chrome эсвэл Edge хөтөч дээр давхар дарж нээнэ.

## 1. GitHub-д байршуулах

1. https://github.com руу нэвтэрнэ.
2. Баруун дээд буланд **+ → New repository** дарна.
3. Repository name: `tehnik-hangamj-lab`, **Public** сонгоод **Create repository** дарна.
4. Нээгдсэн хуудсан дээр **uploading an existing file** холбоос дээр дарна.
5. Энэ хавтсан доторх **бүх файл, хавтсыг** (index.html, css, js, favicon.svg, render.yaml, README.md) чирж оруулна.
6. Доор **Commit changes** дарна.

Git ашигладаг бол:

```bash
cd tehnik-hangamj-lab
git init
git add .
git commit -m "Техник хангамжийн лаб"
git branch -M main
git remote add origin https://github.com/<таны-нэр>/tehnik-hangamj-lab.git
git push -u origin main
```

## 2. Render дээр нийтлэх

1. https://render.com руу орж **GitHub-ээр нэвтэрнэ** (Sign in with GitHub).
2. **+ New → Static Site** сонгоно.
3. `tehnik-hangamj-lab` репозиторийг сонгоод **Connect** дарна.
4. Тохиргоо:
   - **Name:** `tehnik-hangamj-lab`
   - **Branch:** `main`
   - **Build Command:** хоосон үлдээнэ
   - **Publish Directory:** `.`
5. **Create Static Site** дарна. 1–2 минутын дараа `https://tehnik-hangamj-lab.onrender.com` гэх мэт холбоос гарна.
6. Холбоосыг moes чатад байршуулж сурагчдад өгнө.

Static Site нь Render дээр үнэгүй бөгөөд унтдаггүй тул хичээлийн үеэр шууд нээгдэнэ.

> Өөр арга: Render-ийн **New → Blueprint** сонгож репозиторийг холбовол `render.yaml` файлаас тохиргоог автоматаар уншина.

## Засвар оруулах

GitHub дээр файлаа засаад (харандаа дүрс → **Commit changes**) хадгалахад Render автоматаар шинэчилнэ.

- Тестийн асуулт нэмэх: `js/app.js` доторх `const Q=[` хэсэг
- Кэйс өөрчлөх: `js/app.js` доторх `const P=[` хэсэг
- Хичээлийн үе шат, хугацаа: `js/app.js` доторх `const STAGES=[` хэсэг
- Өнгө: `css/style.css` эхэн дэх `:root{ ... }` хэсэг
