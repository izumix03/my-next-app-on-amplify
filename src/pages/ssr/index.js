// pages/ssr.js
export default function SSR({ formattedDate, xff }) {
    return (
        <>
            <h1>Server-side rendered page</h1>
            <p>
                This page is server-side rendered. It was rendered on {formattedDate}.
            </p>
            <p>
                <a href="/">View a static page.</a>
            </p>
            <p>{xff}</p>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const xff = req.headers["x-forwarded-for"]
    console.dir(req.headers)

    const renderDate = Date.now();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "long",
    }).format(renderDate);
    console.log(
        `SSR ran on ${formattedDate}. This will be logged in CloudWatch.`
    );
    return { props: { formattedDate, xff } };
}