import moment from 'moment'

export const useTimeline = (Minute: string) => {
    const current_date = new Date()
    const date = new Date(Minute)
    const _m = current_date.getMinutes() - date.getMinutes();
    const f_m = moment(Minute).format(process.env.NEXT_PUBLIC_DATE_TIME_FORMAT_MOMENT)
    switch (true) {
        case _m == 0:
            return `Vừa mới cập nhật lúc ${f_m}`
        case _m > 0 && _m <= 10:
            return `Cập nhật gần đây ${_m} phút`;
        case _m > 10 && _m <= 30:
            return `Cập nhật cuối lần cuối cách đây ${_m} phút`;
        case _m > 30 && _m <= 60:
            return `Cập nhật cuối lúc ${f_m}`;
        default:
            return `Cập nhật ${f_m}`;
    }
}