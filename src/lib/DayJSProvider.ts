import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import localeData from "dayjs/plugin/localeData";

dayjs.locale(ptBR);
dayjs.extend(utc);
dayjs.extend(localeData);

import { IDateProvider } from "./IDateProvider";

class DayJSProvider implements IDateProvider {
  getMonthByName(month: number) {
    const monthIndex = month ?? dayjs().month();

    const monthsList = dayjs.months();

    return monthsList[monthIndex];
  }

  getYear(year: number) {
    return year ?? dayjs().year();
  }
}

export { DayJSProvider };
