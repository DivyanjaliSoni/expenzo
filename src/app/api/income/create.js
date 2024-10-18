import connect from "../../../dbConfig/dbConfig";
import Income from "../../../models/income"; 

const handler = async (req, res) => {
    await connect(); 

    if (req.method === "POST") {
        const { user, source, amount } = req.body;

        try {
            const newIncome = new Income({ user, source, amount });
            await newIncome.save(); 

            res.status(201).json({ message: "Income record created", income: newIncome });
        } catch (error) {
            console.error("Error creating income record:", error);
            res.status(500).json({ error: "Failed to create income record" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
