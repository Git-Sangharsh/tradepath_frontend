export const demoData = {
  analysis: `**Trade Analysis and Feedback**

I've reviewed your recent trading journal, and here's a breakdown:

**General Observations:**
- You have a mix of winning trades.
- Trades are spread across different sessions and assets.

**Trade-by-Trade Analysis:**

**Trade 1 (2025-07-22):**
- Asset: AUD/USD
- Session: London
- Direction: Long
- Result: Win
- PNL: 400
- Strong confluence usage (Liquidity Sweep, FVG, BOS)

**Trade 2 (2025-07-23):**
- Asset: XAU/USD
- Session: New York
- Direction: Long
- Result: Win
- Good order block entry with confirmation

**Suggestions:**
- Stick to high-confluence setups
- Avoid early entries
- Focus on A/B setups for consistency
`,

  entries: [
    {
      _id: "1",
      date: "2026-04-28T00:00:00.000Z",
      direction: "long",
      asset: "AUD/USD",
      pnl: 400,
      result: "win",
      session: "London",
      setups: "C",
      comments: "Clean liquidity sweep and continuation",
      confluences_used: ["Liquidity Sweep", "FVG", "BOS"],
      user: "user_1"
    },
    {
      _id: "2",
      date: "2026-04-27T00:00:00.000Z",
      direction: "short",
      asset: "EUR/USD",
      pnl: -150,
      result: "loss",
      session: "New York",
      setups: "B",
      comments: "Entered early without confirmation",
      confluences_used: ["Order Block", "CHoCH"],
      user: "user_2"
    },
    {
      _id: "3",
      date: "2026-04-26T00:00:00.000Z",
      direction: "long",
      asset: "GBP/USD",
      pnl: 250,
      result: "win",
      session: "London",
      setups: "A",
      comments: "Strong BOS with FVG fill",
      confluences_used: ["BOS", "FVG", "Equilibrium"],
      user: "user_3"
    },
    {
      _id: "4",
      date: "2026-04-25T00:00:00.000Z",
      direction: "short",
      asset: "USD/JPY",
      pnl: -200,
      result: "loss",
      session: "Asia",
      setups: "C",
      comments: "Fake breakout",
      confluences_used: ["Liquidity Sweep", "MSS"],
      user: "user_4"
    },
    {
      _id: "5",
      date: "2026-04-24T00:00:00.000Z",
      direction: "long",
      asset: "XAU/USD",
      pnl: 600,
      result: "win",
      session: "New York",
      setups: "A",
      comments: "Perfect order block entry",
      confluences_used: ["Order Block", "FVG", "BOS"],
      user: "user_5"
    },
    {
      _id: "6",
      date: "2026-04-23T00:00:00.000Z",
      direction: "short",
      asset: "BTC/USD",
      pnl: 300,
      result: "win",
      session: "London",
      setups: "B",
      comments: "Nice MSS shift",
      confluences_used: ["MSS", "CHoCH", "FVG"],
      user: "user_6"
    },
    {
      _id: "7",
      date: "2026-04-22T00:00:00.000Z",
      direction: "long",
      asset: "ETH/USD",
      pnl: -100,
      result: "loss",
      session: "Asia",
      setups: "C",
      comments: "Weak confirmation",
      confluences_used: ["Equilibrium"],
      user: "user_7"
    },
    {
      _id: "8",
      date: "2026-04-21T00:00:00.000Z",
      direction: "short",
      asset: "USD/CAD",
      pnl: 200,
      result: "win",
      session: "New York",
      setups: "B",
      comments: "Liquidity grab worked well",
      confluences_used: ["Liquidity Sweep", "BOS"],
      user: "user_8"
    },
    {
      _id: "9",
      date: "2026-04-20T00:00:00.000Z",
      direction: "long",
      asset: "NZD/USD",
      pnl: 150,
      result: "win",
      session: "London",
      setups: "A",
      comments: "Smooth trend continuation",
      confluences_used: ["FVG", "Order Block"],
      user: "user_9"
    },
    {
      _id: "10",
      date: "2026-04-19T00:00:00.000Z",
      direction: "short",
      asset: "EUR/GBP",
      pnl: -120,
      result: "loss",
      session: "Asia",
      setups: "C",
      comments: "Bad timing on entry",
      confluences_used: ["CHoCH"],
      user: "user_10"
    }
  ]
};
