import app from "@app";
import dotenv from "dotenv";
import prisma  from "@prisma";


dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

prisma.$connect().then(() => {
    console.log("✅ Connected to database");
});
