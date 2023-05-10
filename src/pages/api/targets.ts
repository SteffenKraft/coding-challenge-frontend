import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import keys from "../../../key.json";
import { TTargetsResponse } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TTargetsResponse>
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
      range: "Targets",
      valueRenderOption: "UNFORMATTED_VALUE",
    };

    const data = await googleSheetApi.spreadsheets.values.get(option);
    const formattedData = data?.data?.values?.slice(1).map((row) => {
      return {
        id: row[0],
        amount: row[1],
      };
    });

    res.status(200).json({ data: formattedData });
    res.end();
  });
}
