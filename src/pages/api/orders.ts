import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import keys from "../../../key.json";
import { TOrdersResponse } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TOrdersResponse>
) {
  const client = new google.auth.JWT(
    keys.client_email,
    undefined,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  client.authorize(async () => {
    const googleSheetApi = google.sheets({ version: "v4", auth: client });

    const option = {
      spreadsheetId: "1La-EJVOrNt3AwWHYvhuCQ5SRtFE9h_kYjgx0dau1HN4",
      range: "Orders",
      valueRenderOption: "UNFORMATTED_VALUE",
    };

    const data = await googleSheetApi.spreadsheets.values.get(option);
    const formattedData = data?.data?.values?.slice(1).map((row) => {
      return {
        id: row[0],
        date: new Date((row[1] - 25569) * 86400000),
        name: row[2],
        amount: row[3],
      };
    });

    res.status(200).json({ data: formattedData });
  });
}
