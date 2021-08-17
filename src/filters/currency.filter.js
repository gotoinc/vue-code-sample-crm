export default function currencyFilter(value, currency = 'EUR') {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency
    }).format(value)
}