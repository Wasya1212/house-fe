import React, { useState } from "react";

import Announcement from "../../components/announcement";

import { useGetAnnouncementQuery } from "../../redux";

export const AnnouncementsPage = () => {
    const [count, setCount] = useState(10);

    const { data: announcements, isLoading } = useGetAnnouncementQuery(count);

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div>
            <select value={count} onChange={(e) => setCount(e.target.value)}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
            </select>
            {announcements.map((announcement, idx) => (
                <Announcement key={`announcement-${idx}`} {...announcement} />
            ))}
        </div>
    );
};

export default AnnouncementsPage;