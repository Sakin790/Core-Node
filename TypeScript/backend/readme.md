[ Client (Browser/cURL) ]
         │  (HTTP Request: GET /api/status)
         ▼
 1.  [ main.ts ] ──► http.createServer ──► router.lookup(req, res)
         │
         ▼
 2.  [ app.routes.ts ] ──► Matches route '/api/status'
         │
         ▼
 3.  [ app.controller.ts ] ──► AppController.getStatus(req, res)
         │  (Calls Service for Data)
         ▼
 4.  [ app.service.ts ] ──► AppService.getSystemStatus()
         │  (Processes Business Logic / Fetches Data)
         ▼
[ Return Data Back: Service ➔ Controller ➔ Client Response ]



ধাপে ধাপে বিস্তারিত ব্যাখ্যা:
১. সার্ভার লেয়ার (main.ts)

    ক্লায়েন্ট যখন GET /api/status লিখে হিট করে, তখন Node-এর http.createServer রিকোয়েস্টটি গ্রহণ করে।

    এটি রিকোয়েস্টটি সরাসরি find-my-way রাউটারের lookup(req, res) মেথডে পাঠিয়ে দেয়।

২. রাউটার লেয়ার (app.routes.ts)

    রাউটার তার রেজিস্টার করা টেবিল থেকে সার্চ করে দেখে /api/status নামে কোনো এন্ডপয়েন্ট আছে কিনা।

    যেহেতু মিল পাওয়া গেছে, সে সরাসরি এর সাথে যুক্ত AppController.getStatus মেথডকে এক্সিকিউট করে।

৩. কন্ট্রোলার লেয়ার (app.controller.ts)

    কন্ট্রোলারের দায়িত্ব হলো রিকোয়েস্ট হ্যান্ডেল করা। সে নিজে ডাটা তৈরি করে না; সে ডাটার জন্য AppService.getSystemStatus()-কে কল করে।

    সার্ভিস থেকে ডাটা ফিরে আসলে সেটিকে সুন্দর করে JSON ফরমেটে গুছিয়ে res.end() দিয়ে ক্লায়েন্টকে পাঠিয়ে দেয়।

৪. সার্ভিস লেয়ার (app.service.ts)

    এখানে থাকে আসল প্রসেসিং বা বিজনেস লজিক।

    সার্ভিস শুধুমাত্র ডাটা প্রসেস করে বা ডাটাবেজ/অন্য কোনো সোর্স থেকে ডাটা এনে অবজেক্ট আকারে কন্ট্রোলারকে রিটার্ন করে দেয়। এর কাছে req বা res-এর কোনো অ্যাক্সেস থাকে না।