import { useState } from "react";

const NAVY = "#1e2f4f";
const GOLD = "#b8922a";
const LIGHT = "#f8f6f2";
const GRAY = "#5a6478";
const DARKGRAY = "#2d3748";
const WHITE = "#ffffff";
const GREEN = "#276749";
const RED = "#8b1a1a";
const BORDER = "#ddd8d0";

const BUSINESS_TYPES = [
  "HVAC",
  "Auto Repair",
  "Landscaping",
  "Roofing / Home Exterior",
  "Plumbing",
  "Cleaning / Janitorial",
  "Restaurant",
  "Dental / Medical Practice",
];

const CHECKLISTS = {
  "HVAC": {
    phase1: [
      { task: "Introduce yourself to every technician and office staff in person.", why: "People are scared about their jobs. A personal hello builds trust on day one.", skip: "Rumors fill the silence. Your best techs start quietly interviewing elsewhere." },
      { task: "Get every login for dispatch software, QuickBooks, vendor portals, and any other system the business uses.", why: "You cannot run the business if you are locked out of your own systems.", skip: "You will not be able to invoice, schedule, or pay anyone until this is resolved." },
      { task: "Confirm payroll runs on time. Know the date, the amount, and the processor.", why: "Missing payroll is unforgivable. It destroys trust in a single day.", skip: "Technicians walk. Replacing a trained HVAC tech takes months and hurts revenue immediately." },
      { task: "Find your top 10 commercial or service contract customers and call each one personally.", why: "Commercial accounts are your most reliable revenue. They need to hear from you directly.", skip: "A commercial client who does not hear from the new owner may quietly choose not to renew." },
      { task: "Confirm all service vehicles are insured, titled, and registered in your name.", why: "If a tech is in an accident in a vehicle that was not properly transferred, you are personally exposed.", skip: "One incident on the road and you could be personally liable with no coverage to protect you." },
      { task: "Make sure business insurance, liability, and worker's comp are active under your name.", why: "One job site injury without coverage can end the business before it starts.", skip: "You are personally on the hook for any claims until this is confirmed." },
      { task: "Identify who actually runs dispatch and scheduling day to day.", why: "There is always one person the whole operation depends on. Find them fast.", skip: "If they leave and you did not know who they were, your scheduling falls apart immediately." },
    ],
    phase2: [
      { task: "Review every open service ticket and active maintenance contract.", why: "You need to know what is promised, what is scheduled, and what is overdue.", skip: "Customers will call about jobs you did not know existed. You will look unprepared." },
      { task: "Pull the last 12 months of bank statements and reconcile them yourself.", why: "The books you reviewed in due diligence may not reflect what is actually in the account.", skip: "You may be making operational decisions based on numbers that are not accurate." },
      { task: "Review all parts and equipment supplier accounts and their payment terms.", why: "HVAC depends on parts availability. Net 30 accounts with suppliers are essential to cash flow.", skip: "You will pay cash upfront for parts while waiting 30 to 60 days to collect from customers." },
      { task: "Sit with each employee for 30 minutes and ask what is working and what is broken.", why: "They know where the problems are. You need that information fast.", skip: "You will spend months fixing problems someone could have told you about in week two." },
      { task: "Understand exactly how the business currently gets new customers.", why: "You need to know if leads come from referrals, ads, or the prior owner's personal relationships.", skip: "If leads were tied to the seller personally, they dry up fast without a plan." },
      { task: "Review all outstanding invoices and anything more than 30 days overdue.", why: "Old receivables go stale. The longer you wait, the harder they are to collect.", skip: "You will lose money that was already yours to collect." },
    ],
    phase3: [
      { task: "Document how a standard service call works from dispatch to invoice.", why: "If it only lives in the dispatcher's head, you are one resignation away from chaos.", skip: "You will be permanently dependent on specific people and can never scale." },
      { task: "Set up automated follow up texts after every completed service call.", why: "Follow up drives reviews, referrals, and repeat service contracts.", skip: "Customers forget you exist. They call whoever answers first next time." },
      { task: "Evaluate your dispatch and scheduling software and ask whether it is the right tool for your size.", why: "Many HVAC businesses run on outdated systems that cost them hours every week.", skip: "You will keep doing things the slow way while competitors run leaner." },
      { task: "Pick one operational improvement and complete it before touching anything else.", why: "Early wins build your credibility with the team and give you momentum.", skip: "Starting too many things at once signals chaos and makes nothing better." },
    ]
  },
  "Auto Repair": {
    phase1: [
      { task: "Introduce yourself to every technician and front desk staff personally.", why: "People are scared about their jobs. A quick hello builds trust immediately.", skip: "Rumors fill the silence. Key techs start quietly job hunting." },
      { task: "Get every login for shop management software, QuickBooks, vendor portals, and any other system.", why: "You cannot run the shop if you are locked out of your own systems.", skip: "You will not be able to invoice, schedule jobs, or pay vendors until this is done." },
      { task: "Confirm payroll is set up and the next check will go out on time.", why: "Missing payroll destroys trust instantly and permanently.", skip: "Technicians walk. Replacing a certified tech in a small shop is a crisis." },
      { task: "Review every open repair order and know its status and expected completion date.", why: "Customers with cars on the lift are your most urgent relationship right now.", skip: "Delayed repairs become complaints, bad reviews, and chargebacks on your watch." },
      { task: "Confirm all technician certifications are current, including ASE and any state required credentials.", why: "Uncertified work on certain systems creates serious legal liability.", skip: "One dispute over a brake job or emissions work and you are on the hook with nothing to stand on." },
      { task: "Make sure business insurance and garage liability coverage are active in your name.", why: "One vehicle damaged in your care without coverage can end the business.", skip: "You are personally liable for any incidents until this transfer is confirmed in writing." },
      { task: "Identify who actually keeps the shop running day to day.", why: "There is always one person the whole operation depends on. Find them fast.", skip: "If they leave and you did not know who they were, you will not know what broke or how to fix it." },
    ],
    phase2: [
      { task: "Review your parts supplier accounts and confirm payment terms with NAPA, AutoZone, or your local distributor.", why: "Net 30 accounts with parts suppliers are essential to cash flow in auto repair.", skip: "You will pay cash upfront for parts while waiting to collect from customers." },
      { task: "Find out how your comeback rate compares to the industry average.", why: "High comeback rates signal quality problems that will damage your reputation fast.", skip: "You will inherit a bad reputation without understanding why customers are not returning." },
      { task: "Sit with each employee for 30 minutes and ask what is working and what is broken.", why: "They know where the real problems are. You need that information now.", skip: "You will spend months fixing things someone could have told you about in week two." },
      { task: "Pull the last 12 months of bank statements and reconcile them yourself.", why: "The books from due diligence may not match what is actually hitting the account.", skip: "You may be making decisions based on numbers that are not accurate." },
      { task: "Review all outstanding invoices and anything more than 30 days overdue.", why: "Old receivables go stale. The longer you wait, the harder they are to collect.", skip: "You will lose money that was already yours to collect." },
      { task: "Understand exactly how the shop currently gets new customers.", why: "You need to know if leads come from referrals, ads, or the prior owner's personal reputation.", skip: "If leads were tied to the seller personally, they dry up fast without a plan." },
    ],
    phase3: [
      { task: "Document how a standard repair job moves from drop off to pickup, step by step.", why: "If it only lives in a tech's head, you are one resignation away from chaos.", skip: "You will be permanently dependent on specific people and can never train anyone new." },
      { task: "Set up a follow up text or call 48 hours after every completed repair.", why: "Follow up is the single best driver of repeat business and five star reviews in auto repair.", skip: "Customers feel like a transaction. They go wherever is cheapest or most convenient next time." },
      { task: "Set a weekly check in with your lead technician or service manager.", why: "Consistent communication prevents surprises and builds real trust with your team.", skip: "Small problems compound quietly until they become expensive ones." },
      { task: "Pick one thing to improve and finish it before starting anything else.", why: "Early wins build your credibility with the team and give you real momentum.", skip: "Starting too many things at once signals chaos and makes nothing better." },
    ]
  },
  "Landscaping": {
    phase1: [
      { task: "Introduce yourself to every crew lead and office staff personally.", why: "People are scared about their jobs. A personal introduction builds trust fast.", skip: "Crew leads start looking for other work. You lose your most experienced people first." },
      { task: "Get every login for scheduling software, QuickBooks, customer management, and any other system.", why: "You cannot run the business if you are locked out of your own systems.", skip: "You will not be able to schedule jobs, invoice customers, or pay employees." },
      { task: "Confirm payroll runs on time. Know the date, amount, and processor.", why: "Missing payroll is unforgivable. It destroys trust instantly.", skip: "Crew members walk mid season. Replacing seasonal labor is nearly impossible." },
      { task: "Confirm all equipment titles, insurance, and registrations are in your name.", why: "Trailers and equipment are your business. You need to own them on paper.", skip: "One equipment theft or accident and you have no legal standing to file a claim." },
      { task: "Identify every active service contract and recurring maintenance account.", why: "Recurring accounts are your most stable revenue. You need to know every single one.", skip: "A contract client who does not hear from you may not renew. You will not know until it is too late." },
      { task: "Make sure business insurance, vehicle coverage, and worker's comp are active in your name.", why: "One injury on a job site without coverage can end the business financially.", skip: "You are personally liable for any claims until this is confirmed." },
      { task: "Identify who the crew leads are and what crews they run.", why: "Crew leads are the backbone of a landscaping operation. Losing one mid season is a crisis.", skip: "If a crew lead leaves and takes their crew, you lose the ability to service those accounts." },
    ],
    phase2: [
      { task: "Map every active job and maintenance contract with its schedule and billing terms.", why: "You need to know what is promised, what is recurring, and what is about to be invoiced.", skip: "You will miss billing cycles and lose revenue that was already earned." },
      { task: "Review all outstanding invoices and anything more than 30 days overdue.", why: "Landscaping clients are notorious for slow pay. Old receivables go stale fast.", skip: "You will lose money that was already yours to collect." },
      { task: "Pull the last 12 months of bank statements and reconcile them yourself.", why: "Seasonality in landscaping makes the books look different than reality at any given moment.", skip: "You may be making cash flow decisions based on numbers that do not reflect the full picture." },
      { task: "Sit with each crew lead for 30 minutes and ask what is working and what is broken.", why: "They know which accounts are difficult, which equipment is failing, and where time is wasted.", skip: "You will spend months discovering problems they could have told you about in week two." },
      { task: "Understand how the business currently gets new customers.", why: "You need to know if growth comes from referrals, door knocking, ads, or the seller's relationships.", skip: "If new leads were tied to the seller personally, they dry up fast without a plan." },
      { task: "Review your supplier accounts for mulch, seed, fertilizer, and equipment parts.", why: "Supplier relationships and payment terms directly affect your job level margins.", skip: "You will pay retail on materials that a good supplier relationship would get at wholesale." },
    ],
    phase3: [
      { task: "Document how a standard maintenance visit works from dispatch to completion.", why: "If it only lives in the crew lead's head, you are one resignation away from chaos.", skip: "You will be permanently dependent on specific people and can never scale." },
      { task: "Set up automated follow up messages after one time jobs like cleanups or installs.", why: "Follow up drives repeat business, referrals, and contract conversions.", skip: "One time customers forget you exist. They call whoever shows up first next season." },
      { task: "Set a weekly check in with your crew leads.", why: "Consistent communication prevents surprises and builds loyalty with your most important people.", skip: "Small problems including equipment issues, client complaints, and scheduling gaps compound silently." },
      { task: "Pick one operational improvement and complete it before starting anything else.", why: "Early wins build your credibility with the crew and give you real momentum.", skip: "Starting too many things at once signals chaos and makes nothing better." },
    ]
  },
  "Roofing / Home Exterior": {
    phase1: [
      { task: "Introduce yourself to every crew lead, estimator, and office staff personally.", why: "Your estimators and crew leads are your revenue engine. They need to hear from you on day one.", skip: "Losing a top estimator in week one is an immediate and serious revenue hit." },
      { task: "Get every login for job management software, QuickBooks, supplier portals, and any other system.", why: "You cannot invoice jobs, schedule crews, or place material orders if you are locked out.", skip: "Jobs in progress will stall and customers will call about schedules you cannot see." },
      { task: "Confirm payroll runs on time. Know the date, amount, and processor.", why: "Missing payroll destroys trust instantly, especially with subcontractors and field crews.", skip: "Crews walk. Finding replacement labor mid project while jobs are open is a nightmare." },
      { task: "Review every open job including its status, scheduled completion date, and pending material deliveries.", why: "Jobs already in progress with materials ordered or crews scheduled are your most urgent priority.", skip: "An open roof during a rain event or a delayed crew creates costly liability and angry customers." },
      { task: "Confirm all vehicles, trailers, and equipment titles are transferred to your name.", why: "Roofing equipment and vehicles are your primary operational assets.", skip: "One accident or theft and you have no legal standing and no insurance coverage to protect you." },
      { task: "Make sure business insurance, general liability, and worker's comp are active in your name.", why: "Roofing carries high injury and property damage risk. Lapsed coverage is catastrophic.", skip: "One fall or property damage claim without active coverage can end the business immediately." },
      { task: "Identify who runs estimating and who manages the field crews.", why: "These two people are the business. Losing either in the first 30 days is a serious problem.", skip: "Without your estimator you cannot sell new jobs. Without your field lead you cannot finish open ones." },
    ],
    phase2: [
      { task: "Map every active job including status, materials ordered, crews assigned, and payment milestones.", why: "Roofing jobs often have milestone payments tied to progress. You need to know where every job stands.", skip: "You will miss invoicing milestones and lose cash flow that was already earned." },
      { task: "Review all material supplier accounts and confirm credit terms with your key vendors.", why: "Supplier credit terms directly affect your ability to bid and execute jobs profitably.", skip: "You will pay cash for materials while waiting 30 to 60 days to collect, creating a serious cash flow gap." },
      { task: "Pull the last 12 months of bank statements and reconcile them yourself.", why: "Roofing revenue is lumpy and seasonal. The books may not reflect actual cash position.", skip: "You may be making financial decisions based on accrued revenue that has not been collected yet." },
      { task: "Sit with your estimator and field lead for an hour each and ask what is working and what is not.", why: "These two people know the real state of the business better than any document will show.", skip: "You will discover critical problems including bad clients, pricing issues, and crew quality the hard way." },
      { task: "Review outstanding invoices and any jobs where final payment has not been collected.", why: "Final payments on completed jobs are often the last thing sellers chase before closing.", skip: "You will lose money on jobs that were already finished and invoiced before you bought the business." },
      { task: "Understand how new jobs are sourced, whether through referrals, insurance work, door knocking, or ads.", why: "The lead source determines whether growth is repeatable after the seller leaves.", skip: "If the seller's personal relationships drove leads, they may dry up fast without a plan." },
    ],
    phase3: [
      { task: "Document the estimating process from initial inspection to signed contract.", why: "If only your estimator knows how to price a job, you are one resignation away from not being able to sell.", skip: "You will be permanently dependent on one person for all new revenue and unable to hire a replacement." },
      { task: "Set up a follow up system for completed jobs using a simple text or call requesting a review.", why: "Online reviews drive roofing leads more than almost any other marketing channel.", skip: "Competitors with more reviews win the job even when your price is the same or lower." },
      { task: "Set a weekly check in with your estimator and field lead together.", why: "Keeping these two people aligned prevents scheduling errors, cost overruns, and customer complaints.", skip: "Disconnects between sales and field create problems that generate bad reviews and customer disputes." },
      { task: "Pick one process to improve and finish it before starting anything else.", why: "Early operational wins build your credibility with the team and create real momentum.", skip: "Starting too many things at once signals instability and distracts from finishing open jobs." },
    ]
  },
  "Plumbing": {
    phase1: [
      { task: "Confirm that a licensed master plumber is active and attached to your business license on day one.", why: "In most states a plumbing company cannot legally operate without a licensed master plumber as the qualifying party. If the seller held this license personally, you may not be able to run jobs until it is resolved.", skip: "You could be operating an unlicensed plumbing company without knowing it, exposing you to fines, voided permits, and liability on every job you complete." },
      { task: "Introduce yourself to every technician and office staff personally.", why: "People are scared about their jobs. A personal introduction on day one builds immediate trust.", skip: "Rumors fill the silence. Licensed journeymen are in high demand and will leave for more stable situations." },
      { task: "Get every login for dispatch software, QuickBooks, vendor portals, permit systems, and any other system.", why: "You cannot schedule, invoice, or pull permits if you are locked out of your own systems.", skip: "Jobs will be delayed and customers will call about appointments you do not even know are scheduled." },
      { task: "Confirm payroll runs on time. Know the date, amount, and processor.", why: "Missing payroll is unforgivable in a trade business and destroys trust instantly.", skip: "Licensed plumbers are in high demand and will leave immediately. Finding replacements takes months." },
      { task: "Confirm all service vehicles are titled, insured, and registered in your name.", why: "Plumbers drive to every job. Vehicles not properly transferred create insurance and liability gaps.", skip: "One accident in a vehicle not in your name and you have no coverage and no legal standing." },
      { task: "Make sure business insurance, general liability, and worker's comp are active under your name.", why: "Plumbing involves water damage risk and job site injuries. Lapsed coverage is immediately dangerous.", skip: "One water damage claim or injury without active coverage can exceed the value of the business itself." },
      { task: "Identify every active service contract and recurring maintenance account.", why: "Recurring commercial maintenance contracts are the most stable revenue in a plumbing business.", skip: "A commercial client who does not hear from the new owner may cancel or put the contract out to bid." },
    ],
    phase2: [
      { task: "Review all open permits on active jobs and confirm they are in the correct name and current status.", why: "Plumbing work requires permits tied to the license holder. Permits in the wrong name create inspection and completion issues.", skip: "Jobs cannot be closed out without a final inspection. Customers will not pay final invoices without completed permits." },
      { task: "Review your parts supplier accounts with Ferguson, Winsupply, or your local distributor and confirm credit terms.", why: "Plumbing suppliers extend credit that is essential to job level cash flow.", skip: "You will pay cash for materials on every job while waiting to collect from customers, creating a serious cash crunch." },
      { task: "Pull the last 12 months of bank statements and reconcile them yourself.", why: "The books from due diligence may not reflect what is actually in the account.", skip: "You may be making financial decisions based on numbers that are not accurate." },
      { task: "Sit with each technician for 30 minutes and ask what is working and what is broken.", why: "They know which customers are difficult, which jobs are problematic, and what equipment is failing.", skip: "You will discover critical problems the hard way instead of hearing them in a 30 minute conversation." },
      { task: "Review all outstanding invoices and anything more than 30 days overdue.", why: "Old receivables go stale fast. Commercial clients in particular need to be invoiced on schedule.", skip: "You will lose money on jobs that were already completed before you took ownership." },
      { task: "Understand how new customers currently find the business.", why: "You need to know if leads come from Google, referrals, repeat customers, or the seller's contractor relationships.", skip: "If leads were tied to the seller's contractor network personally, they may not transfer to you automatically." },
    ],
    phase3: [
      { task: "Document how a service call works from dispatch to invoice and permit closeout.", why: "If it only lives in one person's head, you are one resignation away from missing permits and angry customers.", skip: "You will be dependent on specific people forever and unable to train new technicians properly." },
      { task: "Set up a follow up text after every completed job requesting a review.", why: "Reviews drive plumbing leads. Homeowners search online before calling anyone.", skip: "Competitors with more reviews win the job even when your price and response time are better." },
      { task: "Set a weekly check in with your lead technician or dispatcher.", why: "Consistent communication prevents scheduling errors and builds trust with your most important people.", skip: "Small disconnects between office and field compound quickly into missed appointments and lost revenue." },
      { task: "Pick one process to document and improve before starting anything else.", why: "Early wins build your credibility with the team and create momentum for further improvement.", skip: "Starting too many things at once signals instability and distracts everyone from the actual work." },
    ]
  },
  "Cleaning / Janitorial": {
    phase1: [
      { task: "Contact every commercial client personally within 48 hours of close.", why: "Cleaning contracts are typically at will and clients can cancel with little notice. The relationship often lived with the seller personally.", skip: "A client who does not hear from the new owner within days may quietly start getting quotes from competitors." },
      { task: "Introduce yourself to every crew lead and team member personally.", why: "Cleaning crews are often hourly and have many options. Uncertainty about ownership accelerates turnover.", skip: "Your best crew leads start looking elsewhere. High turnover in cleaning directly causes client attrition." },
      { task: "Get every login for scheduling software, client management, QuickBooks, supply accounts, and any other system.", why: "You cannot schedule crews, invoice clients, or order supplies if you are locked out of your systems.", skip: "Jobs will be missed or invoiced late, which is one of the fastest ways to lose cleaning contracts." },
      { task: "Confirm payroll runs on time. Know the exact date, amount, and processor.", why: "Hourly cleaning employees live paycheck to paycheck. Missing payroll triggers immediate departures.", skip: "Your crews walk. Replacing them fast enough to cover your contracts is nearly impossible." },
      { task: "Review every active commercial contract for notice requirements, billing cycles, and service specifications.", why: "Commercial cleaning contracts often have termination clauses triggered by a change of ownership.", skip: "A client could legally cancel the contract because of the ownership change if you do not address it proactively." },
      { task: "Confirm business insurance, general liability, and bonding are active in your name.", why: "Commercial clients require proof of insurance and bonding before allowing crews on their property.", skip: "One client asks for your certificate of insurance and you cannot produce it. They immediately suspend the contract." },
      { task: "Identify who schedules crews and who handles client communication.", why: "In small cleaning businesses these functions often live with one or two people.", skip: "If your scheduler or account manager leaves in week one, you have no way to manage your client commitments." },
    ],
    phase2: [
      { task: "Review every contract for pricing, scope, and when it was last renegotiated.", why: "Many cleaning contracts have not had a price increase in years. You need to know what you inherited.", skip: "You will be delivering services below market rate without knowing it, eroding your margins from day one." },
      { task: "Pull the last 12 months of bank statements and reconcile them yourself.", why: "Cleaning businesses have high variable costs in labor and supplies that fluctuate month to month.", skip: "Your profitability calculation may be based on numbers that do not reflect actual margins on each contract." },
      { task: "Sit with each crew lead for 30 minutes and ask which accounts are difficult and what is broken operationally.", why: "Crew leads know which clients are never satisfied, which buildings have access issues, and where time is wasted.", skip: "You will discover problem accounts and inefficient routes the hard way instead of on day ten." },
      { task: "Review supply and chemical supplier accounts and their current pricing.", why: "Supply costs directly affect margin on every contract. You may be able to negotiate better terms immediately.", skip: "You will keep paying the prior owner's prices without knowing if better options exist." },
      { task: "Review outstanding invoices and anything more than 30 days overdue.", why: "Commercial clients on net 30 terms can slow pay indefinitely if nobody is tracking it.", skip: "You will lose cash flow on services that were already delivered before you owned the business." },
      { task: "Understand how new contracts are currently being won.", why: "You need to know if growth comes from referrals, cold outreach, or the seller's personal relationships.", skip: "If the seller sourced contracts through personal relationships, the pipeline may dry up immediately." },
    ],
    phase3: [
      { task: "Document how a standard commercial clean is executed including the checklist, timing, and quality standard.", why: "Consistency is the only thing that keeps commercial cleaning contracts long term.", skip: "One client complaint about inconsistent service puts the contract at risk. You need a standard everyone follows." },
      { task: "Set up a simple client check in cadence with a monthly call or email to every commercial account.", why: "Proactive communication is the single best defense against contract cancellations.", skip: "Clients who feel ignored start taking quotes from competitors without telling you." },
      { task: "Set a weekly check in with your crew leads and your scheduler.", why: "Keeping these two functions aligned prevents missed jobs, double bookings, and quality complaints.", skip: "Disconnects between scheduling and crew execution create the kind of errors that cost you contracts." },
      { task: "Pick one route or account to optimize before touching anything else.", why: "Reducing drive time or improving efficiency on one route proves the model and gives you a template.", skip: "Inefficient routes are a silent margin killer. Every hour of unnecessary drive time is money you do not get back." },
    ]
  },
  "Restaurant": {
    phase1: [
      { task: "Confirm your health permit is applied for or transferred before you open the doors.", why: "Health permits are not automatically transferred in most states. You need your own permit to legally operate. This is the single most important compliance item on day one.", skip: "Operating without a valid health permit can result in immediate closure, fines, and a public health notice that permanently damages your reputation." },
      { task: "Confirm the liquor license transfer is in process if the restaurant serves alcohol.", why: "Liquor license transfers typically take 30 to 90 days in most states. If the seller's license lapses before yours is approved, you cannot legally serve alcohol, which can represent 20 to 40 percent of revenue.", skip: "You may have to stop serving alcohol mid operation, which is an immediate revenue hit and a customer experience disaster." },
      { task: "Introduce yourself to every kitchen and front of house staff member personally.", why: "Restaurant staff have many options and low switching costs. Uncertainty about ownership accelerates turnover.", skip: "Your best cooks and managers start looking elsewhere. Replacing kitchen staff mid service is nearly impossible." },
      { task: "Confirm all food handler certifications and manager food safety certifications are current.", why: "Every food handler must be certified and at least one manager must hold a food protection manager certification. These are required to pass a health inspection.", skip: "A health inspector finds an uncertified employee and you fail inspection. The restaurant is closed until corrected." },
      { task: "Get every login for the POS system, QuickBooks, payroll, vendor portals, and delivery platform accounts.", why: "Your POS system is the nerve center of the restaurant. If you cannot access it, you cannot process transactions.", skip: "You will lose sales on day one and be unable to reconcile cash, tips, or sales tax accurately." },
      { task: "Confirm payroll runs on time and tipped employees are being paid correctly under your state's law.", why: "Tipped employee payroll has specific legal requirements that vary by state. Getting this wrong creates immediate legal exposure.", skip: "A single payroll violation with tipped employees can trigger a Department of Labor audit and back pay liability." },
      { task: "Make sure all food and liquor supplier accounts are in your name and deliveries are confirmed.", why: "Restaurants operate on daily or weekly food deliveries. Supplier accounts not properly transferred can disrupt your entire menu.", skip: "A supplier will not deliver to an account that is not properly transferred. You run out of product mid service." },
    ],
    phase2: [
      { task: "Review your food cost percentage on your top 10 menu items.", why: "Food cost is the primary driver of restaurant profitability. Most buyers do not know their actual food cost by item until they look.", skip: "You may be selling popular items at a loss or near zero margin without realizing it." },
      { task: "Pull the last 12 months of bank statements and reconcile them against POS sales reports.", why: "Cash handling in restaurants creates reconciliation gaps that are easy to miss and easy to exploit.", skip: "You may be missing cash shrinkage, theft, or over reporting that was happening before you bought the business." },
      { task: "Review all vendor contracts including food suppliers, linen, pest control, and equipment maintenance.", why: "Restaurants often have auto renewing vendor contracts with unfavorable terms that nobody has renegotiated in years.", skip: "You will keep paying above market rates on contracts you did not even know existed." },
      { task: "Sit with your kitchen manager and front of house manager separately and ask what is working and what is broken.", why: "These two people know the real story including problem employees, quality issues, vendor complaints, and customer patterns.", skip: "You will discover critical operational problems the hard way rather than in a 30 minute conversation on day ten." },
      { task: "Review all outstanding invoices and any vendor accounts more than 30 days overdue.", why: "Suppliers will put you on cash on delivery or stop deliveries if inherited overdue balances are not addressed quickly.", skip: "A supplier stops delivering mid week because of a balance you did not know existed. You are scrambling to cover the menu." },
      { task: "Understand how the restaurant currently gets new customers, whether through delivery platforms, Google, word of mouth, or events.", why: "Each channel has a different cost and margin profile. You need to know what is driving traffic before you change anything.", skip: "You will accidentally cut a channel that was driving significant revenue or keep paying for one that is not working." },
    ],
    phase3: [
      { task: "Document opening and closing procedures for both kitchen and front of house.", why: "Consistency in restaurant operations directly determines food quality, cleanliness scores, and staff performance.", skip: "Every shift runs differently. Quality becomes inconsistent and health inspection scores reflect it." },
      { task: "Set up a system to monitor online reviews on Google, Yelp, and delivery platforms daily.", why: "Restaurant reputation is almost entirely driven by online reviews. A pattern of negative reviews compounds fast.", skip: "A few weeks of unaddressed negative reviews can shift your Google ranking and reduce walk in traffic significantly." },
      { task: "Set a weekly food cost and labor cost review with your kitchen manager.", why: "These two numbers are the only numbers that matter for restaurant profitability in the short term.", skip: "Food and labor cost creep quietly and most owners do not notice until margins have been eroded for months." },
      { task: "Pick one menu item or process to improve before changing anything else.", why: "Restaurants are sensitive to change. Staff and customers both resist rapid changes to what they already know.", skip: "Changing too much too fast disrupts kitchen rhythm and creates quality inconsistency during your most critical period." },
    ]
  },
  "Dental / Medical Practice": {
    phase1: [
      { task: "Confirm your state license and DEA registration if applicable are active and in your name before seeing any patients.", why: "You cannot legally treat patients without an active state license. For controlled substances, an active DEA registration is also required. These do not transfer automatically from the seller.", skip: "Treating a patient without proper licensure creates immediate professional liability and potential criminal exposure." },
      { task: "Confirm your credentialing with all insurance networks is in process or complete.", why: "Insurance credentialing typically takes 60 to 120 days. If you are not credentialed, you cannot bill insurance for services rendered.", skip: "Every patient seen before credentialing is complete may generate a denied claim, creating a significant revenue gap that is hard to recover from." },
      { task: "Introduce yourself to every clinical and administrative staff member personally on day one.", why: "Medical and dental staff have strong patient relationships. Losing key staff disrupts patient retention immediately.", skip: "A trusted hygienist, assistant, or front desk manager who leaves takes patient relationships with them." },
      { task: "Get every login for practice management software, billing system, EHR or EMR, and patient portal.", why: "Your practice management system holds every patient record, appointment, and insurance claim.", skip: "You cannot schedule appointments, submit claims, or access patient records until this is resolved." },
      { task: "Confirm HIPAA compliance across patient records, data storage, staff training, and Business Associate Agreements with all vendors.", why: "HIPAA compliance is a legal requirement from day one. You are responsible for any breach that occurs on your watch.", skip: "A HIPAA violation can result in fines ranging from $100 to $50,000 per violation depending on severity and negligence." },
      { task: "Confirm all controlled substance inventory and DEA records are properly transferred and documented.", why: "The DEA requires precise documentation of controlled substance inventories at the time of ownership transfer.", skip: "A discrepancy in controlled substance records triggers a DEA audit, which is an immediate practice threatening event." },
      { task: "Confirm malpractice insurance is active and covers you personally from day one.", why: "You cannot practice without malpractice coverage. The seller's policy does not cover you.", skip: "One patient complaint before your coverage is active and you have zero protection against a malpractice claim." },
    ],
    phase2: [
      { task: "Review all active insurance contracts and their reimbursement rates.", why: "Insurance reimbursement rates vary significantly and many practices have contracts that have not been renegotiated in years.", skip: "You may be seeing patients for reimbursement rates that are below your actual cost to treat them." },
      { task: "Pull the last 12 months of collections and reconcile them against production.", why: "The gap between production and collections is where revenue disappears in medical and dental practices.", skip: "High production with poor collections is a common problem in practices being sold. You need to know the real number before you inherit the pattern." },
      { task: "Review outstanding insurance claims and any open AR more than 90 days old.", why: "Claims older than 90 days have low collection probability and should be addressed immediately.", skip: "You will lose significant revenue on services already rendered that are sitting uncollected and aging out." },
      { task: "Sit with your front desk manager and lead clinical staff member separately and ask what is working and what is broken.", why: "These two people know the real state of the practice including scheduling problems, patient complaints, and staff issues.", skip: "You will discover operational and staff problems the hard way rather than hearing them in a 30 minute conversation." },
      { task: "Review all vendor contracts for dental supply, lab, equipment maintenance, and software.", why: "Practices often have auto renewing vendor contracts with above market pricing that nobody has reviewed in years.", skip: "You will keep paying prior ownership's rates without knowing if better terms are available." },
      { task: "Understand how new patients currently find the practice.", why: "New patient flow determines long term practice growth. You need to know if it comes from referrals, Google, or the prior doctor's personal relationships.", skip: "If new patients came from the prior doctor's referral relationships, those may not transfer automatically." },
    ],
    phase3: [
      { task: "Document the new patient experience from first call to first appointment.", why: "Consistency in how new patients are treated directly drives retention, reviews, and referrals.", skip: "Inconsistent intake processes create confusion, missed appointments, and poor first impressions that are hard to recover from." },
      { task: "Set up a review monitoring system for Google and Healthgrades.", why: "Online reviews are the primary driver of new patient acquisition for most practices.", skip: "A pattern of unaddressed negative reviews compounds quickly and reduces new patient flow significantly." },
      { task: "Set a monthly collections and AR review with your billing manager.", why: "Collections management is the single biggest lever on practice profitability outside of volume.", skip: "AR ages out silently and becomes uncollectable. Most practices lose 10 to 20 percent of revenue to billing inefficiency." },
      { task: "Pick one patient experience improvement and implement it before changing anything clinical.", why: "Clinical changes early in an ownership transition create staff anxiety and patient uncertainty.", skip: "Changing too much too fast disrupts the rhythm the staff and patients are accustomed to and accelerates turnover." },
    ]
  },
};

const phases = [
  { key: "phase1", label: "Phase 1", title: "Keep the Lights On", days: "Day 1 to 7", desc: "The first seven days are about not breaking anything. Work through every item here before you do anything else." },
  { key: "phase2", label: "Phase 2", title: "Get Your Hands Around It", days: "Day 7 to 30", desc: "Understand what you actually bought. The books, the people, and the real story behind the due diligence package." },
  { key: "phase3", label: "Phase 3", title: "Start Making It Yours", days: "Day 30 to 90", desc: "Stabilized and informed. Now you can start building something better than what you bought." },
];

export default function ChecklistGenerator() {
  const [step, setStep] = useState("input");
  const [businessType, setBusinessType] = useState("");
  const [employees, setEmployees] = useState("");
  const [checklist, setChecklist] = useState(null);
  const [activePhase, setActivePhase] = useState(0);
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({});

  function generate() {
    if (!businessType) return;
    setChecklist(CHECKLISTS[businessType]);
    setStep("checklist");
    setChecked({});
    setExpanded({});
    setActivePhase(0);
  }

  function toggleCheck(phase, idx) {
    const key = `${phase}-${idx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleExpand(phase, idx) {
    const key = `${phase}-${idx}`;
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function countDone(phaseKey, tasks) {
    return tasks.filter((_, i) => checked[`${phaseKey}-${i}`]).length;
  }

  function totalDone() {
    if (!checklist) return 0;
    return phases.reduce((a, p) => a + countDone(p.key, checklist[p.key]), 0);
  }

  function totalCount() {
    if (!checklist) return 0;
    return phases.reduce((a, p) => a + checklist[p.key].length, 0);
  }

  function reset() {
    setStep("input");
    setBusinessType("");
    setEmployees("");
    setChecklist(null);
    setChecked({});
    setExpanded({});
  }

  const cp = phases[activePhase];
  const tasks = checklist ? checklist[cp.key] : [];
  const pct = totalCount() > 0 ? Math.round((totalDone() / totalCount()) * 100) : 0;

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, fontFamily: "'Playfair Display', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; }
        .btn-primary {
          background: #1e2f4f; color: #fff; border: none;
          padding: 14px 36px; font-family: 'Inter', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
          cursor: pointer; transition: background 0.2s; text-transform: uppercase;
        }
        .btn-primary:hover { background: #b8922a; }
        .btn-primary:disabled { opacity: 0.3; cursor: not-allowed; }
        .btn-primary:disabled:hover { background: #1e2f4f; }
        .field {
          width: 100%; padding: 13px 16px;
          border: 1.5px solid #ddd8d0; background: white;
          font-family: 'Inter', sans-serif; font-size: 14px;
          color: #1e2f4f; outline: none; transition: border 0.2s;
          appearance: none; -webkit-appearance: none;
        }
        .field:focus { border-color: #1e2f4f; }
        .field::placeholder { color: #b0a899; }
        select.field {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%231e2f4f' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          padding-right: 38px; cursor: pointer;
        }
        .back {
          background: none; border: none; color: rgba(255,255,255,0.45);
          font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.1em;
          cursor: pointer; text-transform: uppercase; transition: color 0.2s;
        }
        .back:hover { color: #b8922a; }
        .ptab {
          border: none; cursor: pointer; transition: all 0.18s;
          text-align: left; width: 100%; padding: 14px 18px;
        }
        .task {
          border-bottom: 1px solid #ede9e2; padding: 18px 22px;
          transition: background 0.12s;
        }
        .task:hover { background: rgba(184,146,42,0.04); }
        .task:last-child { border-bottom: none; }
        .chk {
          width: 20px; height: 20px; border: 1.5px solid #c8c0b4;
          background: transparent; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.15s; margin-top: 2px;
        }
        .det-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: 10px; color: #b0a899;
          letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.15s;
          white-space: nowrap; padding: 0;
        }
        .det-btn:hover { color: #1e2f4f; }
        .nav {
          background: none; border: 1.5px solid #ddd8d0; color: #1e2f4f;
          width: 36px; height: 36px; cursor: pointer; font-size: 15px;
          display: inline-flex; align-items: center; justify-content: center;
          transition: all 0.18s;
        }
        .nav:hover:not(:disabled) { border-color: #1e2f4f; background: #1e2f4f; color: white; }
        .nav:disabled { opacity: 0.2; cursor: not-allowed; }
        label { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header */}
      <div style={{ background: NAVY, padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 20, fontWeight: 600, letterSpacing: "0.06em" }}>Ramey Advisory</div>
          <div style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: "0.16em", marginTop: 3, textTransform: "uppercase" }}>The AI Department You Never Had</div>
        </div>
        {step === "checklist" && <button className="back" onClick={reset}>New Checklist</button>}
      </div>

      {/* Input */}
      {step === "input" && (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: "64px 24px 48px" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: "0.18em", color: GOLD, marginBottom: 14, textTransform: "uppercase" }}>Week One Transition Tool</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 600, color: NAVY, lineHeight: 1.1, marginBottom: 14 }}>
            Your First 90 Days<br /><em>Start Here.</em>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: GRAY, lineHeight: 1.8, marginBottom: 36 }}>
            Tell us what you bought. We will tell you what to do first, why it matters, and what breaks if you skip it. Built specifically for first time small business buyers.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
            <div>
              <label style={{ fontSize: 9, letterSpacing: "0.16em", color: NAVY, display: "block", marginBottom: 8, textTransform: "uppercase", fontWeight: 600 }}>Business Type</label>
              <select className="field" value={businessType} onChange={e => setBusinessType(e.target.value)}>
                <option value="">Select a business type...</option>
                {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 9, letterSpacing: "0.16em", color: NAVY, display: "block", marginBottom: 8, textTransform: "uppercase", fontWeight: 600 }}>Number of Employees</label>
              <input className="field" placeholder="e.g. 8" value={employees} onChange={e => setEmployees(e.target.value)} type="number" min="1" onKeyDown={e => e.key === "Enter" && generate()} />
            </div>
          </div>

          <button className="btn-primary" onClick={generate} disabled={!businessType}>Generate My Checklist</button>

          <div style={{ marginTop: 36, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#b0a899", lineHeight: 1.75 }}>
              Covers 8 business types commonly acquired through ETA: HVAC, Auto Repair, Landscaping, Roofing, Plumbing, Cleaning, Restaurant, and Dental or Medical. Each checklist is researched and specific, not a generic template.
            </p>
          </div>
        </div>
      )}

      {/* Checklist */}
      {step === "checklist" && checklist && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 60px" }}>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: "0.18em", color: GOLD, marginBottom: 10, textTransform: "uppercase" }}>Transition Checklist</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 600, color: NAVY, marginBottom: 6 }}>
              {businessType}{employees ? ` · ${employees} Employees` : ""}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: GRAY }}>
              {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          {/* Progress */}
          <div style={{ background: WHITE, padding: "18px 22px", marginBottom: 28, borderLeft: `3px solid ${pct === 100 ? GREEN : GOLD}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: "0.12em", color: GRAY, textTransform: "uppercase", fontWeight: 500 }}>Overall Progress</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: NAVY, fontWeight: 600 }}>{totalDone()} of {totalCount()} tasks</span>
            </div>
            <div style={{ height: 3, background: "#ede9e2" }}>
              <div style={{ height: "100%", background: pct === 100 ? GREEN : GOLD, width: `${pct}%`, transition: "width 0.3s" }} />
            </div>
          </div>

          {/* Phase tabs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3, marginBottom: 28 }}>
            {phases.map((p, i) => {
              const done = countDone(p.key, checklist[p.key]);
              const tot = checklist[p.key].length;
              const active = activePhase === i;
              return (
                <button key={p.key} className="ptab" onClick={() => setActivePhase(i)}
                  style={{ background: active ? NAVY : WHITE, borderTop: `3px solid ${active ? GOLD : BORDER}` }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: "0.14em", color: active ? GOLD : GRAY, marginBottom: 5, textTransform: "uppercase", fontWeight: 500 }}>{p.days}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: active ? WHITE : NAVY, lineHeight: 1.25, marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: active ? "rgba(255,255,255,0.45)" : GRAY }}>{done} of {tot} done</div>
                </button>
              );
            })}
          </div>

          {/* Phase description */}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: GRAY, lineHeight: 1.75, marginBottom: 22, paddingLeft: 16, borderLeft: `2px solid ${BORDER}` }}>
            {cp.desc}
          </p>

          {/* Tasks */}
          <div style={{ background: WHITE }}>
            {tasks.map((t, idx) => {
              const ck = `${cp.key}-${idx}`;
              const done = !!checked[ck];
              const open = !!expanded[ck];
              return (
                <div key={idx} className="task">
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <button className="chk" onClick={() => toggleCheck(cp.key, idx)}
                      style={{ borderColor: done ? GOLD : "#c8c0b4", background: done ? GOLD : "transparent" }}>
                      {done && <span style={{ color: WHITE, fontSize: 11, fontWeight: 700 }}>✓</span>}
                    </button>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                        <p style={{
                          fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
                          color: done ? "#b0a899" : DARKGRAY,
                          textDecoration: done ? "line-through" : "none",
                          lineHeight: 1.6, transition: "all 0.15s", flex: 1
                        }}>
                          {t.task}
                        </p>
                        {!done && (
                          <button className="det-btn" onClick={() => toggleExpand(cp.key, idx)}>
                            {open ? "hide" : "details"}
                          </button>
                        )}
                      </div>
                      {!done && open && (
                        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
                          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, color: GREEN, letterSpacing: "0.12em", textTransform: "uppercase", flexShrink: 0, marginTop: 4, minWidth: 28 }}>Why</span>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: DARKGRAY, lineHeight: 1.7 }}>{t.why}</p>
                          </div>
                          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, color: RED, letterSpacing: "0.12em", textTransform: "uppercase", flexShrink: 0, marginTop: 4, minWidth: 28 }}>Skip</span>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: DARKGRAY, lineHeight: 1.7 }}>{t.skip}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#c8c0b8", flexShrink: 0, marginTop: 4 }}>{idx + 1} of {tasks.length}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
            <button className="nav" onClick={() => setActivePhase(p => p - 1)} disabled={activePhase === 0}>←</button>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: GRAY, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>Phase {activePhase + 1} of 3</span>
            <button className="nav" onClick={() => setActivePhase(p => p + 1)} disabled={activePhase === 2}>→</button>
          </div>

          {/* Footer */}
          <div style={{ marginTop: 44, paddingTop: 20, borderTop: `1px solid ${BORDER}`, textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#b0a899", marginBottom: 4 }}>Questions about your transition?</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: GRAY }}>rameyscapital@gmail.com · 361-449-5548</p>
          </div>
        </div>
      )}
    </div>
  );
}
