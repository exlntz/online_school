
export const formatPhone = (value?: string | null): string => {
    if (!value) return '';

    const phone = value.replace(/\D/g, '');
    if (!phone) return '';

    let resultPhoneNumber = '+7';
    const body = ['7', '8'].includes(phone[0]) ? phone.slice(1) : phone

    if (body.length > 0) resultPhoneNumber += ` (${body.substring(0, 3)}`;
    if (body.length >= 4) resultPhoneNumber += `) ${body.substring(3, 6)}`;
    if (body.length >= 7) resultPhoneNumber += `-${body.substring(6, 8)}`;
    if (body.length >= 9) resultPhoneNumber += `-${body.substring(8, 10)}`;

    return resultPhoneNumber
};