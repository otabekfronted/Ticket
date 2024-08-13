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
            const response = await fetch("http://localhost:4000/tickets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Ticket added:", result);
                router.push("/tickets"); // Redirect to the tickets page to see the updated list
            } else {
                console.error("Failed to add ticket:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
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
