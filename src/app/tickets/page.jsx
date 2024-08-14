"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Page = () => {
    const [data, setData] = useState([]);
    const [expandedTicketId, setExpandedTicketId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://json-api.uz/api/project/otabek-ticketc/tickets"
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await res.json();
                console.log(result); // Ma'lumotlarni tekshirib ko'rish uchun
                setData(result.data || []); // Agar result.data mavjud bo'lsa, uni o'rnating, aks holda bo'sh array
            } catch (error) {
                console.error("Error fetching data:", error);
                setData([]);
            }
        };

        fetchData();
    }, []);

    const handleExpand = (id) => {
        setExpandedTicketId(expandedTicketId === id ? null : id);
    };

    return (
        <main>
            <Navbar />
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold">Tickets</h2>
                    <p>Currently open tickets</p>
                </div>
                <Link href="/tickets/create">
                    <button className="btn-primary bg-[#7762FF]">New</button>
                </Link>
            </div>
            <div className="m-auto flex justify-center flex-wrap gap-5">
                {data.length > 0 ? (
                    data.map((ticket) => (
                        <div className="card" key={ticket.id}>
                            <h2 className="text-lg font-bold">
                                {ticket.title}
                            </h2>
                            <p>
                                {expandedTicketId === ticket.id
                                    ? ticket.body
                                    : `${ticket.body.slice(0, 200)}...`}
                            </p>
                            {ticket.body.length > 200 && (
                                <button
                                    className="btn-primary mt-2"
                                    onClick={() => handleExpand(ticket.id)}
                                >
                                    {expandedTicketId === ticket.id
                                        ? "Show Less"
                                        : "Show More"}
                                </button>
                            )}
                            <p className={`pill ${ticket.priority}`}>
                                {ticket.priority}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No tickets available.</p>
                )}
            </div>
        </main>
    );
};

export default Page;
