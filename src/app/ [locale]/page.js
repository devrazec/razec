export async function generateMetadata({ params }) {
  return {
    htmlAttributes: {
      lang: params.locale,
    },
  };
}
