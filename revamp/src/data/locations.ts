import { OFFICE_ASSETS_BASE_URL } from "@/config/variables";

export interface LocationItem {
  image: string;
  city: string;
  address: string;
  mapLink: string;
}

/** Addresses and map links supplied from the kriscent.in footer. */
export const locations: LocationItem[] = [
  {
    image: `${OFFICE_ASSETS_BASE_URL}/tempAssets/garadia-mahadev-temple1%20(1)%20(1)%201.webp?updatedAt=1725274383969`,
    city: "Kota",
    address:
      "186, Agrawal Bhawan 1st Floor Shopping Center, nearby Chaupati, Kota, Rajasthan 324007, India",
    mapLink: "https://maps.app.goo.gl/gaTTpTMpaZYkZJQj7",
  },
  {
    image: `${OFFICE_ASSETS_BASE_URL}/tempAssets/jaipur%20(2)%20(1).webp?updatedAt=1737023787377`,
    city: "Jaipur",
    address: "70/38 Patel Marg, Mansarovar Jaipur, Rajasthan-302020, India",
    mapLink: "https://maps.app.goo.gl/he1r6Q3EVtcNbv28A",
  },
  {
    image: `${OFFICE_ASSETS_BASE_URL}/tempAssets/dubai.webp`,
    city: "UAE",
    address:
      "Shams Business Center, Sharjah Media City Free Zone, Al- Messaned, Sharjah, UAE",
    mapLink: "https://maps.app.goo.gl/xWHjHhc3ZghWP9e47",
  },
  {
    image: `${OFFICE_ASSETS_BASE_URL}/tempAssets/1399.jpg?updatedAt=1732164980564`,
    city: "UK",
    address: "128 City Road, London, United Kingdom EC1V 2NX",
    mapLink: "https://maps.app.goo.gl/5S76QYKkHj4NaKZT8",
  },
  {
    image: `${OFFICE_ASSETS_BASE_URL}/tempAssets/385.webp?updatedAt=1738734079108`,
    city: "Ireland",
    address: "4 Curlew Road, Dublin 12. D12RH59, Ireland",
    mapLink: "https://maps.app.goo.gl/hJ5EZfxNKjnrbxMNA",
  },
];
