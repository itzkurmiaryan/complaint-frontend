export default function CampusIssueMap() {
  return (
    <section className="px-6 py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="mb-10 text-3xl font-bold">Live Campus Issue Map</h2>

        <div className="w-full h-[400px] border rounded-3xl overflow-hidden shadow-lg">
          {/* Proper Google Maps Embed */}
          <iframe
            title="Invertis University Campus Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.987146889064!2d79.4908052!3d28.2919024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0023f8a1f8cdd%3A0x5b10af261bf34c99!2sInvertis%20University!5e0!3m2!1sen!2sin!4v1699111111111!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}