const questions = [
    {
        question: "อายุปัจจุบัน",
        options: [
            { text: "\tก. มากกว่า 55 ปี", weight: 1 },
            { text: "\tข. 45 – 55 ปี", weight: 2 },
            { text: "\tค. 35 – 44 ปี", weight: 3 },
            { text: "\tง. น้อยกว่า 35 ปี", weight: 4 }
        ]

    },
    {
        question: "ปัจจุบันท่านมีภาระทางการเงินและค่าใช้จ่ายประจำ เช่น ค่าผ่อนบ้าน รถ ค่าใช้จ่ายส่วนตัว และค่าเลี้ยงดูครอบครัว เป็นสัดส่วนเท่าใด",
        options: [
            { text: "\tก. มากกว่าร้อยละ 75 ของรายได้ทั้งหมด", weight: 1 },
            { text: "\tข. ระหว่างร้อยละ 50 ถึงร้อยละ 75 ของรายได้ทั้งหมด", weight: 2 },
            { text: "\tค. ระหว่างร้อยละ 25 ถึงร้อยละ 50 ของรายได้ทั้งหมด", weight: 3 },
            { text: "\tง. น้อยกว่าร้อยละ 25 ของรายได้ทั้งหมด", weight: 4 },
        ]
    },
    {
        question: "ท่านมีสถานภาพทางการเงินในปัจจุบันอย่างไร",
        options: [
            { text: "\tก. มีทรัพย์สินน้อยกว่าหนี้สิน", weight: 1 },
            { text: "\tข. มีทรัพย์สินเท่ากับหนี้สิน", weight: 2 },
            { text: "\tค. มีทรัพย์สินมากกว่าหนี้สิน", weight: 3 },
            { text: "\tง. มีความมั่นใจว่ามีเงินออมหรือเงินลงทุนเพียงพอสาหรับการใช้ชีวิตหลังเกษียณอายุแล้ว", weight: 4 },
        ]
    },
    {
        question: "ท่านเคยมีประสบการณ์ หรือมีความรู้ในการลงทุนในทรัพย์สินกลุ่มใดต่อไปนี้บ้าง",
        options: [
            { text: "\tก. เงินฝากธนาคาร", weight: 1 },
            { text: "\tข. พันธบัตรรัฐบาล หรือกองทุนรวมพันธบัตรรัฐบาล", weight: 2 },
            { text: "\tค. หุ้นกู้ หรือกองทุนรวมตราสารหนี้", weight: 3 },
            { text: "\tง. หุ้นสามัญ หรือกองทุนรวมหุ้น หรือสินทรัพย์อื่นที่มีความเสี่ยงสูง", weight: 4 },
        ]
    },
    {
        question: "ระยะเวลาที่ท่านคาดว่าจะไม่มีความจาเป็นต้องใช้เงินลงทุนนี้",
        options: [
            { text: "\tก. ไม่เกิน 1 ปี", weight: 1 },
            { text: "\tข. 1 ถึง 3 ปี", weight: 2 },
            { text: "\tค. 3 ถึง 5 ปี", weight: 3 },
            { text: "\tง. มากกว่า 5 ปี", weight: 4 },
        ]
    },
    {
        question: "วัตถุประสงค์หลักในการลงทุนของท่าน คือ",
        options: [
            { text: "\tก. เน้นเงินต้นต้องปลอดภัยและได้รับผลตอบแทนสม่าเสมอแต่ต่าได้", weight: 1 },
            { text: "\tข. เน้นโอกาสได้รับผลตอบแทนที่สม่าเสมอ แต่อาจเสี่ยงที่จะสูญเสียเงินต้นได้บ้าง", weight: 2 },
            { text: "\tค. เน้นโอกาสได้รับผลตอบแทนที่สูงขึ้น แต่อาจเสี่ยงที่จะสูญเสียเงินต้นได้มากขึ้น", weight: 3 },
            { text: "\tง. เน้นผลตอบแทนสูงสุดในระยะยาว แต่อาจเสี่ยงที่จะสูญเงินต้นส่วนใหญ่ได้", weight: 4 },
        ]
    },
    {
        question: "จากกลุ่มการลงทุนที่กำหนดให้ ท่านเต็มใจที่จะลงทุนในกลุ่มการลงทุนใดมากที่สุด",
        options: [
            { text: "\tก. กลุ่มการลงทุนที่ 1 มีโอกาสได้รับผลตอบแทน 2.5% โดยไม่ขาดทุนเลย", weight: 1 },
            { text: "\tข. กลุ่มการลงทุนที่ 2 มีโอกาสได้รับผลตอบแทนสูงสุด 7% แต่อาจมีผลขาดทุนได้ถึง 1%", weight: 2 },
            { text: "\tค. กลุ่มการลงทุนที่ 3 มีโอกาสได้รับผลตอบแทนสูงสุด 15% แต่อาจมีผลขาดทุนได้ถึง 5%", weight: 3 },
            { text: "\tง. กลุ่มการลงทุนที่ 4 มีโอกาสได้รับผลตอบแทนสูงสุด 25% แต่อาจมีผลขาดทุนได้ถึง 15%", weight: 4 },
        ]
    },
    {
        question: "ถ้าท่านเลือกลงทุนในทรัพย์สินที่มีโอกาสได้รับผลตอบแทนมาก แต่มีโอกาสขาดทุนสูงด้วยเช่นกัน ท่านจะรู้สึกอย่างไร",
        options: [
            { text: "\tก. กังวลและตื่นตระหนกกลัวขาดทุน", weight: 1 },
            { text: "\tข. ไม่สบายใจแต่พอเข้าใจได้บ้าง", weight: 2 },
            { text: "\tค. เข้าใจและรับความผันผวนได้ในระดับหนึ่ง", weight: 3 },
            { text: "\tง. ไม่กังวลกับโอกาสขาดทุนสูง และหวังกับผลตอบแทนที่อาจจะได้รับสูงขึ้น", weight: 4 },
        ]
    },
    {
        question: "ท่านจะรู้สึกกังวล/รับไม่ได้ เมื่อมูลค่าเงินลงทุนของท่านมีการปรับตัวลดลงในสัดส่วนเท่าใด",
        options: [
            { text: "\tก. 5% หรือน้อยกว่า", weight: 1 },
            { text: "\tข. มากกว่า 5%-10%", weight: 2 },
            { text: "\tค. มากกว่า 10%-20%", weight: 3 },
            { text: "\tง. มากกว่า 20% ขึ้นไป", weight: 4 },
        ]
    },
    {
        question: "หากปีที่แล้วท่านลงทุนไป 100,000 บาท ปีนี้ท่านพบว่ามูลค่าเงินลงทุนลดลงเหลือ 85,000 บาท ท่านจะทาอย่างไร",
        options: [
            { text: "\tก. ตกใจ และต้องการขายการลงทุนที่เหลือทิ้ง", weight: 1 },
            { text: "\tข. กังวลใจ และจะปรับเปลี่ยนการลงทุนบางส่วนไปในทรัพย์สินที่เสี่ยงน้อยลง", weight: 2 },
            { text: "\tค. อดทนถือต่อไปได้ และรอผลตอบแทนปรับตัวกลับมา", weight: 3 },
            { text: "\tง. ยังมั่นใจ เพราะเข้าใจว่าต้องลงทุนระยะยาว และจะเพิ่มเงินลงทุนในแบบเดิมเพื่อเฉลี่ยต้นทุน", weight: 4 },
        ]
    },
]
export default questions;