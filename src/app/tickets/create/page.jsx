// pages/ticket-form.js
"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

const TicketForm = () => {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(
                "https://json-api.uz/api/project/otabek-ticketc/tickets/",
                {
                    method: "GET", // Ma'lumot yuborish uchun POST so‘rovini ishlatamiz
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.ok) {
                const result = await response.json();
                console.log("Ticket added:", result);
                router.push("/tickets"); // Yangilangan ro‘yxatni ko‘rish uchun /tickets sahifasiga o‘tkazish
            } else {
                console.error("Failed to add ticket:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
            return {
                props: {
                    tickets: [],
                },
                revalidate: 10,
            };
        }
    };

    return (
        <main>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input type="text" name="title" required />
                </label>
                <label>
                    Description:
                    <textarea name="body" required></textarea>
                </label>
                <label>
                    Priority:
                    <select name="priority" required>
                        <option value="high">high</option>
                        <option value="medium">medium</option>
                        <option value="low">low</option>
                    </select>
                </label>
                <button type="submit" className="bg-blue-800 text-white">
                    Add Ticket
                </button>
            </form>
        </main>
    );
};

export default TicketForm;
