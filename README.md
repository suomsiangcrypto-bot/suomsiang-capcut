# SUOMSIANG CAPCUT — Desktop App

เครื่องเล่นเพลง/วิดีโอ SUOMSIANG CAPCUT แพ็กเป็นแอปเดสก์ท็อป Windows ด้วย Electron
และ build เป็นไฟล์ `.exe` อัตโนมัติด้วย GitHub Actions

## ไฟล์ในโปรเจกต์
- `index.html` — ตัวเครื่องเล่น (UI + ระบบเสียงทั้งหมด)
- `main.js` — โปรเซสหลักของ Electron (สร้างหน้าต่างโปร่งใสไร้ขอบ + ปุ่มย่อ/ปิด)
- `package.json` — ข้อมูลแอป + ค่า build ของ electron-builder
- `.github/workflows/build.yml` — สั่งให้ GitHub build `.exe` ให้อัตโนมัติ
- `.gitignore`

## รันบนเครื่องตัวเอง (ทดสอบก่อน)
ต้องมี Node.js (เวอร์ชัน 20 ขึ้นไป) ก่อน → https://nodejs.org

```bash
npm install      # ติดตั้ง Electron + electron-builder (ครั้งแรกครั้งเดียว)
npm start        # เปิดแอปขึ้นมาดู
```

## build เป็น .exe บนเครื่องตัวเอง
```bash
npm run dist
```
ไฟล์จะอยู่ในโฟลเดอร์ `dist/`
- `SUOMSIANG CAPCUT Setup x.y.z.exe` — ตัวติดตั้ง
- `SUOMSIANG-CAPCUT-Portable-x.y.z.exe` — แบบพกพา (ก๊อปไปรันเครื่องไหนก็ได้ ไม่ต้องติดตั้ง)

## ให้ GitHub build ให้อัตโนมัติ
1. สร้าง repo บน GitHub แล้ว push โค้ดทั้งหมดขึ้นไป (ดูขั้นตอนในแชต)
2. ทุกครั้งที่ push ขึ้น `main` GitHub จะ build ให้เอง → เข้าแท็บ **Actions** เพื่อโหลดไฟล์
3. ถ้าอยากออกเวอร์ชันจริงให้แนบไฟล์ไว้ในหน้า Releases ให้ติดแท็กเวอร์ชัน:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
   แล้วไฟล์ `.exe` จะไปโผล่ในหน้า **Releases** ของ repo อัตโนมัติ

## ไอคอน (ถ้าต้องการ)
วางไฟล์ `build/icon.ico` ขนาด 256×256 ไว้ในโปรเจกต์ electron-builder จะใช้เป็นไอคอนแอปให้เอง
ถ้าไม่ใส่ จะใช้ไอคอนเริ่มต้นของ Electron
