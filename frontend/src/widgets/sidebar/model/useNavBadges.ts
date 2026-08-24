import { MOCK_HOMEWORK } from "../../../shared/constants";

export const useNavBadges = (): Record<string, number> => {
    const activeHomeworkCount = MOCK_HOMEWORK.filter((hw) => hw.status === 'current').length;

    return {
        homework: activeHomeworkCount,
    };
};