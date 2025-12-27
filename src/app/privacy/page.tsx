export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-white">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Open Source Connect Global (OSCG) respects your privacy and is committed
        to protecting your personal data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <p className="mb-4">
        When you sign in using Google OAuth, we may collect:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Name</li>
        <li>Email address</li>
        <li>Profile picture (optional)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        How We Use Your Information
      </h2>
      <p className="mb-4">
        We use this information only for authentication, account creation,
        and providing access to our platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Data Sharing
      </h2>
      <p className="mb-4">
        We do not sell, trade, or share your personal data with third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Contact Us
      </h2>
      <p>
        If you have any questions about this Privacy Policy, contact us at:
        <br />
        <strong>hello@osconnect.org</strong>
      </p>
    </main>
  );
}
