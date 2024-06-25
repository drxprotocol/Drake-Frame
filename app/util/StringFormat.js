export function generateAddressSummary(address, headChartCount, tailChartCount = 4) {
    if (!address) {
        return '';
    } else {
        let _headChartCount = headChartCount || 3;
        let addressSummary = `${address.substring(0, _headChartCount)}...${address.substring(
            address.length - tailChartCount,
            address.length,
        )}`;
        return addressSummary;
    }
}
