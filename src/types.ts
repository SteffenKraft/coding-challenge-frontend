export type TOrdersResponseObject = {
  id: string;
  date: Date;
  name: string;
  amount: number;
};

export type TOrdersResponse = {
  data: TOrdersResponseObject[] | undefined;
};

export type TTargetsResponseObject = {
  id: string;
  amount: number;
};

export type TTargetsResponse = {
  data: TTargetsResponseObject[] | undefined;
};

export type TParams = { params: { year: string; month: string } }[] | undefined;

export type TProps = {
  data: any;
};
