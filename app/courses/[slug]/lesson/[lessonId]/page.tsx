'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const COURSES: Record<string, { title: string; lessons: number; paid: boolean }> = {
  'intro-forex': { title: 'What is Forex Trading?', lessons: 5, paid: false },
  'intro-gold': { title: 'Introduction to Gold (XAUUSD)', lessons: 4, paid: false },
  'candlesticks': { title: 'Reading Candlestick Charts', lessons: 6, paid: false },
  'forex-fundamentals': { title: 'Forex Fundamentals', lessons: 12, paid: true },
  'gold-mastery': { title: 'Gold Trading Mastery', lessons: 18, paid: true },
  'risk-management': { title: 'Risk Management & Psychology', lessons: 10, paid: true },
  'market-structure': { title: 'Advanced Market Structure', lessons: 15, paid: true },
  'bootcamp': { title: 'Full Trading Bootcamp', lessons: 36, paid: true },
  'certification': { title: 'Certification Exam', lessons: 1, paid: true },
}

const LESSON_TITLES: Record<string, string[]> = {
  'intro-forex': ['What is Forex?', 'Major Currency Pairs', 'Bid/Ask Spreads Explained', 'Global Trading Sessions', 'Forex Market Participants'],
  'intro-gold': ['Why Gold Matters', 'Factors That Move Gold', 'Reading XAUUSD Charts', 'Gold vs Other Assets'],
  'candlesticks': ['Candle Anatomy', 'Bullish Patterns', 'Bearish Patterns', 'Support & Resistance from Candles', 'Reversal Signals', 'Putting It All Together'],
  'forex-fundamentals': ['What Are Pips?', 'Leverage Explained', 'Margin Requirements', 'Position Sizing', 'Order Types', 'Interest Rates & Forex', 'NFP & Economic Calendar', 'CPI & Inflation Data', 'Central Bank Policy', 'Carry Trade Strategy', 'Fundamental Analysis Framework', 'Practice Exercises'],
  'gold-mastery': ['XAUUSD Overview', 'Market Structure Basics', 'Order Blocks', 'Liquidity Zones', 'DXY Correlation', 'Gold & Commodities', 'Trading Sessions & Gold', 'Asian Range Strategy', 'London Breakout', 'New York Momentum', 'News Trading Gold', 'Gold & Inflation', 'Geopolitical Events', 'Risk Management for Gold', 'Position Sizing for XAUUSD', 'Trade Management', 'Journaling Trades', 'Full System Review'],
  'risk-management': ['Why Risk Management Matters', 'Position Sizing Formula', 'Stop Loss Placement', 'Risk-Reward Ratios', 'Drawdown Control', 'Max Risk Per Trade', 'Emotional Discipline', 'Trading Psychology', 'Building a Routine', 'Review & Improvement'],
  'market-structure': ['Market Structure Overview', 'HH/HL Analysis', 'Break of Structure', 'Change of Character', 'Supply & Demand Basics', 'Supply Zones', 'Demand Zones', 'Order Flow', 'Trend Identification', 'Range-Bound Markets', 'Entry Triggers', 'Stop Placement in Structure', 'Multi-Timeframe Analysis', 'Structure Trading Plan', 'Advanced Review'],
  'bootcamp': ['Welcome & Overview', 'Forex Basics Refresher', 'Gold Fundamentals', 'Technical Analysis Foundations', 'Candlestick Mastery', 'Market Structure Deep Dive', 'Supply & Demand Pro', 'Order Blocks & Liquidity', 'DXY & Correlation', 'Fundamental Analysis', 'News Trading', 'Risk Management System', 'Psychology & Discipline', 'Trade Planning', 'Journaling Framework', 'Live Market Analysis 1', 'Live Market Analysis 2', 'Mock Trading Session 1', 'Mock Trading Session 2', 'Strategy Review', 'Backtesting Methodology', 'Forward Testing', 'Performance Evaluation', 'Common Mistakes', 'Advanced Entries', 'Advanced Exits', 'Scaling Positions', 'Portfolio Management', 'Mentorship Session 1', 'Mentorship Session 2', 'Mentorship Session 3', 'Mentorship Session 4', 'Exam Preparation', 'Final Q&A', 'Bootcamp Review', 'Graduation'],
  'certification': ['Certification Exam'],
}

const LESSON_CONTENT: Record<string, string[]> = {
  'intro-forex': [
    `Forex, short for "foreign exchange," is the global marketplace where currencies are traded. It is the largest and most liquid financial market in the world, with over $7.5 trillion traded daily.

Unlike stock markets, forex has no central exchange. Trading happens electronically over-the-counter (OTC) through a global network of banks, brokers, and financial institutions.

How It Works

When you trade forex, you are simultaneously buying one currency and selling another. Currencies are quoted in pairs — for example, EUR/USD (euro vs US dollar). The first currency is the base, the second is the quote.

If you buy EUR/USD, you expect the euro to strengthen against the dollar. If you sell EUR/USD, you expect the euro to weaken.

Why Trade Forex?
- High liquidity — you can enter and exit positions instantly
- 24-hour market — trade any time, Sunday evening through Friday night
- Low barriers to entry — start with as little as $10
- Leverage — control large positions with a small amount of capital
- Profit in rising or falling markets — go long or short

Key Terminology
- Pip — the smallest price movement in a currency pair (usually 0.0001)
- Spread — the difference between bid and ask price
- Lot — a standardised trading size (1 lot = 100,000 units)
- Leverage — borrowed capital that amplifies your trading size
- Margin — the amount required to open a leveraged position

Forex in Ethiopia

For Ethiopian traders, forex offers access to global markets that are otherwise difficult to reach due to local currency controls. Most Ethiopian traders focus on major pairs like EUR/USD, GBP/USD, and XAU/USD (gold), which offer tight spreads and high liquidity.

Gold (XAU/USD) is particularly popular among Ethiopian traders because it correlates with global economic uncertainty and tends to have clearer technical patterns.

In the next lesson, we will explore the major currency pairs and which ones are best for beginners.`,
    `Currency pairs fall into three categories: majors, minors, and exotics.

Major Pairs

Majors involve the US dollar paired with another major economy's currency. They offer the tightest spreads and highest liquidity.

- EUR/USD (Euro / US Dollar) — the most traded pair globally
- GBP/USD (British Pound / US Dollar) — known for sharp movements
- USD/JPY (US Dollar / Japanese Yen) — sensitive to Asian session activity
- USD/CHF (US Dollar / Swiss Franc) — a safe-haven pair
- AUD/USD (Australian Dollar / US Dollar) — tied to commodity prices
- USD/CAD (US Dollar / Canadian Dollar) — correlated with oil prices
- NZD/USD (New Zealand Dollar / US Dollar) — influenced by agriculture

Minor Pairs (Crosses)

Minors do not include the US dollar. They typically have wider spreads.

- EUR/GBP, EUR/JPY, GBP/JPY, EUR/CHF, GBP/CHF

Exotic Pairs

Exotics pair a major currency with a developing economy's currency. Spreads are wide and liquidity is lower.

- USD/ETB (US Dollar / Ethiopian Birr) — not freely traded on forex markets
- USD/ZAR (US Dollar / South African Rand)
- USD/TRY (US Dollar / Turkish Lira)
- USD/BRL (US Dollar / Brazilian Real)

Which Pairs Should Beginners Trade?

Start with one or two major pairs. EUR/USD is the best choice for beginners because:
- Tightest spreads (lowest cost per trade)
- Highest liquidity (easy to enter and exit)
- Most educational resources available
- Clear technical patterns

Avoid exotics until you have at least 6 months of experience. Their wide spreads and unpredictable movements can quickly erode a beginner's account.

Session-Based Pairs

Different pairs are more active during different trading sessions:
- Asian Session: USD/JPY, AUD/USD, NZD/USD
- London Session: EUR/USD, GBP/USD, EUR/GBP
- New York Session: EUR/USD, USD/CAD, USD/JPY

Understanding which pairs to trade and when is a foundational skill. In the next lesson, we will cover bid/ask spreads — the real cost of trading.`,
    `Every trade you place has a cost: the spread. Understanding spreads is essential to becoming a profitable trader.

What Is the Spread?

The spread is the difference between the bid (sell) price and the ask (buy) price of a currency pair.

- Bid Price: the price at which you can sell the base currency
- Ask Price: the price at which you can buy the base currency
- Spread: Ask minus Bid

Example: If EUR/USD is quoted as 1.1050 / 1.1052, the spread is 2 pips.

Why Spreads Matter

The spread is your cost of entry. Every trade starts in a small loss equal to the spread. For you to profit, the price must move in your direction by at least the spread amount.

Tight vs Wide Spreads

Tight spreads (1-3 pips) — typical for major pairs during peak sessions
Wide spreads (5-20+ pips) — typical for exotics, low liquidity periods, or news events

Factors That Affect Spreads:
- Liquidity — more liquidity = tighter spreads
- Volatility — high volatility = wider spreads
- Time of day — spreads widen during session transitions and after-hours
- News events — spreads can blow out dramatically during major releases
- Broker type — ECN brokers typically offer tighter spreads than market makers

Spread and Trading Cost Calculation

For a standard 1 lot (100,000 units) trade on EUR/USD with a 2-pip spread:
- Pip value for 1 lot EUR/USD = $10
- Spread cost = 2 pips x $10 = $20

That $20 is paid every time you open a trade. If you trade 10 times per day, that is $200 in daily costs — or $4,000 per month.

How to Minimize Spread Costs
- Trade only during peak liquidity hours (London and New York overlap)
- Focus on major pairs with the tightest spreads
- Avoid trading during major news releases
- Use limit orders instead of market orders when possible
- Choose a broker with competitive spreads

Understanding spreads is the first step toward proper trade management. In the next lesson, we will explore the global trading sessions and when to trade.`,
    `The forex market operates 24 hours a day, five days a week. But not all hours are equal. Understanding trading sessions helps you choose when to trade for optimal volatility and liquidity.

The Three Major Sessions

1. Asian Session (Tokyo) — 00:00 to 09:00 GMT
   - Opens the trading week
   - Lower volatility overall
   - Best for USD/JPY, AUD/USD, NZD/USD
   - Range-bound movements common

2. London Session — 08:00 to 17:00 GMT
   - Highest volume session
   - Most volatility
   - Best for EUR/USD, GBP/USD, EUR/GBP
   - Where most institutional trading occurs

3. New York Session — 13:00 to 22:00 GMT
   - Second highest volume
   - Overlaps with London (13:00-17:00 GMT)
   - High volatility during overlap
   - US economic data releases drive movement

Session Overlaps

The most important time for traders is the London-New York overlap (13:00-17:00 GMT). During this period:
- Trading volume is at its peak
- Spreads are tightest
- Price movements are most reliable
- Breakouts are more likely to sustain

Best Times for Ethiopian Traders

Ethiopia is in the East Africa Time Zone (EAT, GMT+3).
- London Session: 10:00 to 19:00 EAT
- New York Session: 15:00 to 00:00 EAT
- London-NY Overlap: 15:00 to 19:00 EAT
- Asian Session: 03:00 to 12:00 EAT

The best window for most Ethiopian traders is 15:00-19:00 EAT, when both London and New York are active.

What to Trade in Each Session

Asian Session
- Slow, range-bound movements
- Good for breakout traders waiting for London open
- Focus on AUD/USD, USD/JPY

London Session
- Fast, directional movements
- Best for trend trading and breakouts
- Focus on EUR/USD, GBP/USD

New York Session
- Momentum-driven after US data releases
- Good for news trading
- Focus on EUR/USD, USD/CAD, XAU/USD

Key Takeaway: Trade during high-liquidity periods whenever possible. The quality of your entries improves significantly when you trade during the right session. In the final lesson, we will look at who participates in the forex market.`,
    `The forex market is not a single entity — it is made up of diverse participants with different goals, time horizons, and capital sizes.

The Five Major Participant Groups

1. Central Banks
The most powerful participants. Central banks like the Federal Reserve (US), European Central Bank (ECB), and Bank of Japan (BoJ) influence currency values through monetary policy.

They set interest rates, conduct open market operations, and sometimes intervene directly in currency markets. Central bank announcements are the most market-moving events in forex.

2. Commercial Banks
Banks facilitate currency exchange for clients and trade for their own profit. The largest banks — JPMorgan, Citibank, Deutsche Bank — handle billions in daily volume.

Interbank trading accounts for the majority of forex volume. Banks trade with each other through electronic brokering systems like EBS and Reuters.

3. Institutional Investors
Pension funds, hedge funds, and insurance companies trade forex to hedge international investments or speculate on currency movements.

These participants trade in large size (often 100+ lots) and hold positions for weeks to months.

4. Corporations
Multinational companies like Apple, Toyota, and Nestle exchange currencies to conduct international business. They use forex to:
- Convert revenue from foreign sales
- Pay suppliers in other currencies
- Hedge against currency risk

Corporations are typically not speculative — they trade to facilitate business operations.

5. Retail Traders
Individual traders like you. Retail traders account for roughly 5-10% of daily forex volume but are the most visible group due to the rise of online trading platforms.

Most retail traders use leverage (sometimes as high as 1:500) to control large positions with small capital. This amplifies both profits and losses.

Understanding Market Participants

Why does this matter to you? Because different participants behave differently:
- Central banks create long-term trends through interest rate policy
- Banks and institutions create short to medium-term moves as they execute large orders
- Retail traders often drive reversals at key levels (false breakouts)

When you see a currency pair moving sharply, ask yourself: which participants are driving this move?

The institutional order flow concept teaches that smart money (banks and institutions) trades differently than retail money. Learning to identify their footprints on the chart is a key skill for becoming a consistently profitable trader.

Congratulations — you have completed the Introduction to Forex course! You now understand the basics of currency trading, how to read pairs, the cost of trading, when to trade, and who you are trading against.`,
  ],
  'intro-gold': [
    `Gold (XAU/USD) is the most traded commodity in the world and the most popular instrument among Ethiopian forex traders.

Why Gold Is Special

Gold is unique because it is both a commodity and a currency. It has:
- Intrinsic value — physical metal with industrial and jewellery demand
- Monetary history — used as money for thousands of years
- Safe-haven status — investors flock to gold during uncertainty
- Inflation hedge — preserves purchasing power when currencies devalue

Gold vs Fiat Currency

Unlike paper money, gold cannot be printed. Central banks cannot create more gold to stimulate the economy. This scarcity gives gold its enduring value.

The Gold Price

Gold is priced in US dollars per troy ounce. The symbol XAU stands for "one troy ounce of gold" and USD is the US dollar. So XAU/USD = the price of one ounce of gold in dollars.

Current prices range from $1,800 to $3,000+ per ounce depending on global economic conditions.

Why Ethiopian Traders Trade Gold

Several factors make gold particularly attractive for Ethiopian traders:
- High volatility — gold moves 20-50 pips daily on average
- Clear technical patterns — gold respects support and resistance well
- London and New York session activity — aligns with Ethiopian daytime hours
- Lower spreads than many currency pairs during peak hours
- No correlation with Ethiopian economy — provides true diversification

Gold vs Trading USD/ETB

The Ethiopian birr (ETB) is not freely traded on global forex markets. Gold offers Ethiopian traders exposure to global markets without needing to trade the birr directly.

Since gold is denominated in USD, it also provides indirect dollar exposure, which is valuable in a country where access to foreign currency is restricted.

In the next lesson, we will explore the key factors that drive gold prices.`,
    `Gold prices move based on a unique set of drivers that combine commodity economics, monetary policy, and market psychology.

1. US Dollar Strength

Gold has an inverse relationship with the US dollar. When the dollar strengthens, gold prices typically fall. When the dollar weakens, gold prices rise.

Reason: Gold is priced in dollars. A stronger dollar means you need fewer dollars to buy the same ounce of gold.

Key indicator: DXY (US Dollar Index) — watch this alongside gold.

2. Interest Rates

Gold and interest rates have an inverse relationship. When rates rise, gold typically falls. When rates are cut, gold typically rises.

Reason: Gold pays no interest. When bonds offer high yields, investors sell gold to buy yield-bearing assets. When yields are low, gold becomes more attractive.

Key events to watch: Federal Reserve interest rate decisions, FOMC meeting minutes.

3. Inflation

Gold is a traditional inflation hedge. When inflation rises, gold prices tend to increase as people seek to protect their purchasing power.

Key indicators: CPI (Consumer Price Index), PCE (Personal Consumption Expenditures), Core Inflation.

4. Geopolitical Uncertainty

Wars, trade disputes, sanctions, and political instability drive gold prices higher. Investors rush to gold as a safe haven during times of crisis.

Recent examples: Russia-Ukraine conflict boosted gold. US-China trade tensions supported gold prices.

5. Central Bank Buying

Central banks around the world hold gold as part of their foreign exchange reserves. When central banks buy large quantities of gold (as they have in recent years), prices are supported.

Countries like China, India, Turkey, and Russia have been significant gold buyers.

6. Market Sentiment

Fear and greed drive short-term gold price movements. The CBOE Gold Volatility Index (GVZ) measures expected volatility in gold prices, similar to the VIX for stocks.

Combining These Factors

Rarely does one factor alone move gold prices. Usually, multiple factors align:
- Weak dollar + falling rates + high inflation = strongly bullish gold
- Strong dollar + rising rates + low inflation = bearish gold
- Geopolitical crisis can override all other factors temporarily

In the next lesson, we will apply this knowledge to reading XAUUSD charts.`,
    `Now that you understand what drives gold prices, let us look at how to read a gold chart effectively.

XAUUSD Chart Basics

A gold chart shows the price of one ounce of gold in US dollars over time. Each candlestick represents a specific time period (1 minute, 5 minutes, 1 hour, 1 day, etc.).

Timeframe Selection

- 1-minute and 5-minute: For scalping quick moves (advanced)
- 15-minute and 1-hour: For day trading (recommended for beginners)
- 4-hour and daily: For swing trading (best for most Ethiopian traders)

Gold traders in Ethiopia often use the 1-hour chart for direction and the 15-minute chart for entries.

Key Levels on a Gold Chart

1. Support — price levels where gold tends to stop falling and bounce
2. Resistance — price levels where gold tends to stop rising and reverse
3. Round numbers — gold tends to react at levels like 1900, 1950, 2000
4. Previous day high/low — important for day trading
5. London/New York open — often sets the tone for the session

Gold-Specific Chart Patterns

Gold tends to form clear technical patterns:
- Double tops and bottoms at key round numbers
- Head and shoulders patterns at major reversal points
- Ascending and descending channels during trends
- Flag and pennant patterns after sharp moves

Volume Profile

Volume is particularly useful for gold trading. High-volume nodes (areas where a lot of trading occurred) act as strong support or resistance. Low-volume nodes (areas with little trading) are where price moves quickly.

Key Times to Watch Gold Charts

- 03:00 EAT — Asian session range sets early direction
- 10:00 EAT — London opens, volume picks up
- 15:00-19:00 EAT — London-NY overlap, highest volatility
- US data releases (usually 15:30 EAT) — sharp gold moves

Gold-Specific Indicators

While pure price action is preferred, these indicators work well with gold:
- 200 EMA on 1H chart — major trend filter
- 20 EMA — dynamic support/resistance in trends
- RSI (14) — oversold below 30, overbought above 70
- ATR (14) — measures volatility, useful for stop placement

In the final lesson, we will compare gold to other assets and explain why gold is often the best choice for Ethiopian traders.`,
    `To understand why gold is so valuable to traders, it helps to compare it with other major asset classes.

Gold vs Stocks (Equities)

- Correlation: Generally low to negative
- Gold shines when stocks fall (safe haven)
- Stocks offer dividends, gold offers no yield
- Gold has lower daily correlations to news than individual stocks
- Trading gold requires less capital than trading a diversified stock portfolio

Gold vs Forex (Currency Pairs)

- Gold has higher volatility than most major pairs
- Gold trends are often cleaner and more persistent
- Gold is less susceptible to central bank intervention than currencies
- Spreads on gold are competitive with major pairs during peak hours
- Gold has no "country risk" — you are not betting on a single economy

Gold vs Cryptocurrency

- Gold has 5,000+ years of history as money; crypto has ~15 years
- Gold is less volatile than Bitcoin (10-20% daily swings in crypto)
- Gold is regulated and legal everywhere; crypto regulations vary by country
- Gold is tangible (you can hold it); crypto is purely digital
- Gold has no counterparty risk; crypto exchanges can be hacked

Gold vs Commodities (Oil, Copper, etc.)

- Gold is more liquid than almost any other commodity
- Gold has better 24-hour coverage than most commodities
- Gold is less affected by supply chain disruptions than industrial commodities
- Gold is more correlated with currency markets than other commodities
- Gold has unique safe-haven demand that other commodities lack

Why Gold Is the Best Choice for Ethiopian Traders

1. Accessibility — every Ethiopian broker offers XAUUSD
2. Volatility — enough movement for daily profits without being chaotic
3. Predictability — gold respects technical levels more consistently than many assets
4. Session alignment — gold moves most during London/NY, which falls in Ethiopian daytime
5. Capital efficiency — you can trade gold with relatively small account sizes
6. Educational resources — more material available for gold trading than any other commodity
7. Tax treatment — gold trading is not subject to the same restrictions as local Ethiopian investments

What You Have Learned

In this course, you learned:
- Why gold matters and its unique role in financial markets
- The six key factors that drive gold prices
- How to read gold charts with timeframe selection and key levels
- How gold compares with other asset classes

You now have the foundation needed to start your gold trading journey. The next step is to practice on a demo account and apply these concepts. As you progress, consider enrolling in our Gold Trading Mastery course for advanced strategies and live trading mentorship.`,
  ],
  'candlesticks': [
    `Candlestick charts are the most popular way to view price data in financial markets. They originated in Japan in the 18th century, developed by a rice trader named Munehisa Homma.

A single candlestick tells you everything that happened during a specific time period: the open, high, low, and close price.

Parts of a Candlestick

1. Body — the wide part representing the range between open and close
   - If the close is higher than the open, the body is typically green or white (bullish)
   - If the close is lower than the open, the body is typically red or black (bearish)

2. Upper Wick (Shadow) — the thin line above the body showing the highest price reached

3. Lower Wick (Shadow) — the thin line below the body showing the lowest price reached

Anatomy of a Bullish Candle
- Open at the bottom of the body
- Close at the top of the body
- Upper wick extends above the close
- Lower wick extends below the open

Anatomy of a Bearish Candle
- Open at the top of the body
- Close at the bottom of the body
- Upper wick extends above the open
- Lower wick extends below the close

What Candles Tell You

- Long body = strong buying or selling pressure
- Short body = indecision or low activity
- Long upper wick = sellers pushed price down from the high
- Long lower wick = buyers pushed price up from the low
- Small body with long wicks = "Doji" — market indecision

Timeframes

Each candle represents a fixed time period:
- 1M (1 minute) — each candle = 1 minute of trading
- 5M (5 minutes), 15M, 1H (1 hour), 4H (4 hours)
- 1D (1 day), 1W (1 week), 1 Month

Higher timeframes show more significant price levels. Lower timeframes show more detail.

Why Candlesticks Matter

Candlesticks are the purest form of price data. Unlike indicators, they are not derived from calculations — they are the actual prices being traded. Learning to read candles means learning to read what the market is actually doing.

Pro Tip: When learning to read candles, start with the daily chart. Daily candles filter out the noise of intraday movements and show you the true picture of supply and demand.

In the next lesson, we will explore specific bullish candlestick patterns.`,
    `Bullish candlestick patterns signal that buyers are taking control and prices are likely to rise. Here are the most important ones to know.

1. Hammer

A hammer has a small body at the top of the candle with a long lower wick (at least twice the body length). It appears during a downtrend.

What it means: Sellers pushed prices lower during the session, but buyers stepped in and pushed prices back up to close near the open. The selling pressure was rejected.

Trading tip: A hammer is more reliable when followed by a green candle confirming the reversal.

2. Bullish Engulfing

A two-candle pattern. The first candle is a small red (bearish) candle. The second is a large green (bullish) candle that completely "engulfs" the first candle's body.

What it means: Buyers overwhelmed sellers. After a downtrend, this signals a strong potential reversal.

Trading tip: The larger the engulfing candle and the deeper the downtrend, the more reliable the signal.

3. Morning Star

A three-candle pattern marking a major bottom:
- First candle: long red (bearish)
- Second candle: small body (indecision) — can be red or green
- Third candle: long green (bullish) closing at least halfway up the first candle's body

What it means: Selling momentum exhausted, buyers have taken control.

Trading tip: The morning star is one of the most reliable reversal patterns, especially at key support levels.

4. Bullish Harami

A two-candle pattern. First candle is a long green body. Second candle is a small body (red or green) that sits inside the first candle's body.

What it means: The downtrend is losing momentum. The small body shows indecision after a strong move.

Trading tip: Less reliable than engulfing patterns — look for confirmation on the next candle.

5. Piercing Line

A two-candle pattern. First is a long red candle. Second opens lower than the first's close but closes above the midpoint of the first candle's body.

What it means: Buyers pushed prices up from the open and closed strong. A reversal signal.

Reliability of Bullish Patterns

Not all patterns are equally reliable. Factors that increase reliability:
- Pattern occurs at a clear support level
- Pattern appears at the end of a prolonged downtrend
- Higher timeframe confirms the level (e.g., daily support)
- Volume confirms the reversal
- Followed by a strong bullish candle

Bullish patterns are most effective when combined with support levels and trend analysis. In the next lesson, we will explore bearish patterns.`,
    `Bearish candlestick patterns signal that sellers are taking control and prices are likely to fall.

1. Shooting Star

A shooting star has a small body at the bottom of the candle with a long upper wick (at least twice the body length). It appears during an uptrend.

What it means: Buyers pushed prices higher during the session, but sellers stepped in and pushed prices back down to close near the open. The buying pressure was rejected.

Trading tip: A shooting star is more reliable when followed by a red candle confirming the reversal.

2. Bearish Engulfing

A two-candle pattern. First is a small green (bullish) candle. Second is a large red (bearish) candle that completely engulfs the first candle's body.

What it means: Sellers overwhelmed buyers. After an uptrend, this signals a strong potential reversal.

Trading tip: The larger the engulfing candle and the longer the uptrend, the more reliable the signal.

3. Evening Star

A three-candle pattern marking a major top:
- First candle: long green (bullish)
- Second candle: small body (indecision)
- Third candle: long red (bearish) closing at least halfway down the first candle's body

What it means: Buying momentum exhausted, sellers have taken control.

Trading tip: The evening star is the bearish equivalent of the morning star and equally reliable.

4. Bearish Harami

A two-candle pattern. First is a long green body. Second is a small body (red or green) inside the first candle's body.

What it means: The uptrend is losing momentum. Small body shows indecision.

Trading tip: Wait for confirmation — the next candle closing lower than the harami.

5. Hanging Man

Same shape as a hammer (small body, long lower wick) but appears during an uptrend.

What it means: Although the candle closed near its open, the long lower wick shows sellers tried to push price down. The uptrend may be weakening.

Pattern Recognition Tips

- Always look at the trend first. A pattern in isolation means nothing.
- Higher timeframe patterns matter more than lower timeframe patterns.
- Patterns at round numbers or previous support/resistance are more reliable.
- Combine patterns with trend lines for higher probability trades.

Common Mistakes

- Trading patterns without trend context
- Ignoring the wicks (wicks tell the real story)
- Taking every pattern as a signal
- Not waiting for confirmation on the next candle

In the next lesson, we will see how candlesticks reveal key support and resistance levels.`,
    `Candlesticks are not just for spotting reversals — they are excellent tools for identifying support and resistance levels.

How Candles Reveal Support

Support is a price level where buying pressure is strong enough to overcome selling pressure. On a candlestick chart, support appears as:

1. Long lower wicks — buyers stepped in at those lows
2. Multiple touches — price bounces from the same level several times
3. Bullish reversal patterns — hammers, bullish engulfing at the same level
4. High volume candles — large bodies near the same price

How Candles Reveal Resistance

Resistance is a price level where selling pressure is strong enough to overcome buying pressure. Signs include:

1. Long upper wicks — sellers rejected those highs
2. Multiple rejections — price fails at the same level repeatedly
3. Bearish reversal patterns — shooting stars, bearish engulfing at the same level
4. Low volume above — few trades happened beyond that level

Building a Support and Resistance Map

Step 1: Open a daily chart for the pair you are trading
Step 2: Scroll back at least 3 months
Step 3: Mark levels where price reversed sharply with long wicks
Step 4: Mark levels where price stalled with multiple touches
Step 5: Note round numbers (e.g., 1900, 1950 for gold)

Candle Clusters

When multiple candles have long wicks at the same level, that level becomes more significant. A "cluster" of wicks acts as a magnet — price tends to return to these levels.

Inside Bars and Signal Bars

An inside bar occurs when a candle's high is lower than the previous high and its low is higher than the previous low. It signals consolidation and often precedes a breakout.

Signal bars are candles with decisive closes — a strong close near the high (bullish signal) or near the low (bearish signal).

Volume Confirmation

Candles with high volume are more significant than those with low volume. A support level tested with high-volume bullish candles is stronger than one tested with low-volume candles.

Practical Exercise

Take a gold chart on the 1-hour timeframe and find:
1. Three support levels where long lower wicks appear
2. Three resistance levels where long upper wicks appear
3. Any reversal patterns at those levels

This simple exercise will dramatically improve your ability to read any market. In the next lesson, we will cover specific reversal signals.`,
    `Reversal signals are candlestick patterns that indicate a change in the current trend. They are the most powerful tools in a candlestick trader's arsenal.

Key vs Reversal Patterns

Engineers make a distinction between:
- Reversal patterns — signal the current trend may end
- Continuation patterns — signal the current trend will resume

The most reliable reversals happen at key support/resistance levels.

Major Reversal Signals

1. Pin Bar (Doji with a Long Wick)
A single candle with a very long wick and small body. It represents a clear rejection of price.

Bullish pin bar: long lower wick in a downtrend — rejection of lows
Bearish pin bar: long upper wick in an uptrend — rejection of highs

2. Engulfing Patterns (reviewed)
Two candles showing a complete reversal of the previous session's sentiment.

3. Three Outside Up/Down
A three-candle pattern:
- For Three Outside Up: bearish candle, then a bullish engulfing, then a higher close
- For Three Outside Down: bullish candle, then a bearish engulfing, then a lower close

4. Tweezer Tops and Bottoms
Two candles with matching highs (tweezer top) or matching lows (tweezer bottom).

Tweezer top: two consecutive candles with the same high — resistance level confirmed
Tweezer bottom: two consecutive candles with the same low — support level confirmed

5. Abandoned Baby
A rare but powerful reversal pattern similar to a morning/evening star but with a gap:
- The middle candle is a doji that gaps away from the previous candle
- The third candle gaps in the opposite direction

This pattern is very reliable but rarely appears.

False Signals and How to Avoid Them

No pattern works 100% of the time. Here is how to filter false signals:

1. Wait for confirmation — never trade a pattern on the candle that forms it; wait for the next candle to confirm
2. Check the trend — patterns against the major trend are less reliable
3. Look at the size — tiny patterns in low volatility are noise
4. Consider the context — a reversal pattern at a major level is more significant than one in the middle of nowhere
5. Use multiple timeframes — a reversal on the 5-minute chart is less meaningful than the same pattern on the daily chart

Reversal Trading Plan

1. Identify a clear trend (uptrend or downtrend)
2. Wait for price to reach a key support or resistance level
3. Look for a reversal candlestick pattern
4. Wait for confirmation (next candle closes in the expected direction)
5. Enter with a stop loss beyond the pattern's wick
6. Target the next major level

Putting It All Together

When you combine:
- Trend direction (from higher timeframe)
- Support/resistance (from candle clusters)
- Reversal pattern (pin bar, engulfing, etc.)
- Confirmation (next candle)

You have a high-probability trade setup. This is the foundation of price action trading.

In the final lesson, we will bring everything together into a practical framework.`,
    `You have learned the individual pieces. Now let us put them together into a complete analysis framework.

The Candle-First Approach

Before using any indicator, read the candlesticks first. Candles are the source data — everything else is derived from them.

Step 1: Identify the Market Structure
Look at the daily chart:
- Are we making higher highs and higher lows? (Uptrend)
- Are we making lower highs and lower lows? (Downtrend)
- Are we ranging between support and resistance? (Sideways)

Step 2: Mark Key Levels
On the daily chart, mark:
- Major support and resistance (where price reversed multiple times)
- Recent swing highs and lows
- Round numbers
- Previous week's high and low

Step 3: Drop to Your Trading Timeframe
Using the 1-hour or 4-hour chart:
- Is price approaching a key level?
- What is the candle structure at that level?
- Are any reversal patterns forming?

Step 4: Look for Confirmation
- A reversal pattern at a key level
- Followed by a confirming candle
- Ideally higher timeframe aligns with your bias

Step 5: Execute
- Entry: at confirmation candle close or limit order at the pattern's high/low
- Stop loss: beyond the pattern's extreme wick
- Take profit: next major level or 2:1 risk-reward minimum

Example Trade Setup

Market: XAUUSD (Gold)
Timeframe: 1-hour chart

1. Daily chart shows an uptrend (higher highs, higher lows)
2. 1-hour chart shows price pulling back to a previous resistance-turned-support level (1900.00)
3. A hammer forms at 1900.00 with a long lower wick
4. Next candle opens and closes higher — confirmation
5. Entry: Buy at confirmation close
6. Stop loss: below 1890.00 (10 points below the wick)
7. Take profit: 1940.00 (previous high — 4:1 risk-reward)

Common Mistakes to Avoid

1. Trading without a plan — know your entry, stop, and target before you click
2. Moving your stop loss — never widen a stop, only tighten it
3. Adding to losers — averaging down is a fast way to blow up your account
4. Overtrading — not every setup is worth taking
5. Ignoring higher timeframes — the daily trend always matters

Building Your Candle Reading Practice

Week 1: Spend 15 minutes daily looking at daily charts. Identify trend direction.
Week 2: Add level marking. Find 3 support and 3 resistance levels.
Week 3: Identify patterns forming at levels. Start a trade journal.
Week 4: Take your first trades with small size. Review every trade.

Continue Your Learning

You have completed the Candlestick Reading course. This foundation will serve you for your entire trading career. To deepen your knowledge:
- Practice on a demo account daily
- Study the advanced courses in our Academy
- Join our mentorship program for live analysis

Remember: Candlesticks tell you what the market is doing. Your job is not to predict — it is to react to what the candles show you.`,
  ],
  'forex-fundamentals': [
    `A pip is the smallest price movement in a currency pair. Understanding pips is essential for calculating profit, loss, and risk.

What Is a Pip?

Pip stands for "Percentage in Point." For most currency pairs, a pip equals 0.0001. For pairs involving the Japanese yen, a pip equals 0.01.

Examples:
- EUR/USD moves from 1.1050 to 1.1051 = 1 pip movement
- USD/JPY moves from 110.50 to 110.51 = 1 pip movement

Pipettes

Most brokers now quote prices to one additional decimal place (1/10th of a pip). This is called a pipette or fractional pip.

- EUR/USD quoted at 1.10505 — the last digit (5) is a pipette
- 10 pipettes = 1 pip

Why Pips Matter

Pips are the universal unit of measurement in forex. They allow traders to:
- Calculate profit and loss consistently across all pairs
- Set stop losses and take profits in pip distances
- Compare volatility between different currency pairs

Pip Value Calculation

The value of a pip depends on three factors:
1. The currency pair being traded
2. The size of your position (lot size)
3. The base currency of your trading account

For EUR/USD with a standard lot (100,000 units):
- 1 pip = 0.0001 × 100,000 = $10

For USD/JPY with a standard lot:
- 1 pip = 0.01 × 100,000 = ¥1,000 ÷ USD/JPY rate = $9.09 (at 110.00)

For mini lots (10,000 units), divide by 10. For micro lots (1,000 units), divide by 100.

Practical Examples

If you buy 1 mini lot of EUR/USD at 1.1050 and it moves to 1.1080:
- Movement = 30 pips
- Pip value = $1 (mini lot)
- Profit = 30 × $1 = $30

If you buy 1 standard lot of GBP/USD at 1.2500 and it moves to 1.2450:
- Movement = -50 pips
- Pip value = $10 (standard lot)
- Loss = 50 × $10 = $500

Pip Value for Gold (XAU/USD)

Gold uses a different pip structure. For XAU/USD:
- 1 pip = $0.01 (1 cent) in price movement
- For 1 standard lot: 1 pip = $10
- For 1 mini lot: 1 pip = $1

Ethiopian Trader Example

A trader in Ethiopia opens a mini lot (10,000 units) on EUR/USD with a 50-pip stop loss. If stopped out:
- Risk = 50 pips × $1 = $50
- With a 500 ETB account (roughly $10), this would be too large. Proper position sizing is essential — and that is what we will cover in later lessons.

Pips are the building block of all forex calculations. Master them before moving on to leverage and margin.`,
    `Leverage is one of the most powerful tools in forex trading — and one of the most dangerous when misused.

What Is Leverage?

Leverage allows you to control a large position with a small amount of capital. Your broker lends you the remaining funds.

Example:
- Your account: $500
- Leverage: 1:100
- You can control: $50,000 worth of currency
- This means you can trade 0.5 standard lots (50,000 units)

How Leverage Works

If you have $500 and want to trade 1 mini lot (10,000 units) of EUR/USD:
- Total position value: $10,000
- Required margin (at 1:100): $100 (1% of position)
- Free margin: $400

Your $500 collateral controls $10,000. This amplifies both profits and losses.

The Double-Edged Sword

Without leverage: 1% market move on $500 = $5 profit or loss
With 1:100 leverage: 1% market move = $100 profit or loss

The same leverage that multiplies profit also multiplies loss. A 1% move against you can wipe out 20% of your account.

Leverage Levels for Ethiopian Traders

Most brokers offer leverage from 1:1 to 1:500. Here is what different levels mean:
- 1:10 — Low risk, minimal amplification. Need $10,000 to control $100,000
- 1:50 — Moderate risk, common for experienced traders
- 1:100 — Standard for most retail traders
- 1:200 — Aggressive, common in some regions
- 1:500 — High risk. A small move can liquidate your account

The Trap of Maximum Leverage

Many new traders choose the highest leverage available (1:500) thinking it maximizes profit potential. In reality, it maximizes risk.

With 1:500 leverage:
- Your free margin disappears quickly
- A 0.2% move against you can trigger a margin call
- Emotional trading increases because every pip feels amplified

Leverage and Capital

The appropriate leverage depends on your account size and risk tolerance:
- Small accounts ($50-500): 1:30 to 1:50 maximum
- Medium accounts ($500-5000): 1:100 maximum
- Large accounts ($5000+): 1:50 or less

Rule of thumb: Never risk more than 1-2% of your account on a single trade, regardless of leverage.

Leverage in Ethiopia

Ethiopian traders should be especially careful with leverage because:
- Currency controls make depositing additional funds difficult
- Broker access may be limited, affecting your ability to add margin
- Local internet reliability can cause unexpected connection issues during volatile moves

Practical Advice: Start with low leverage (1:20 or 1:30) even if your broker offers higher. As you gain experience, slowly increase leverage. Most professional traders use less than 1:50.

In the next lesson, we will cover margin requirements — how much capital you actually need to open and maintain positions.`,
    `Margin is the amount of money required in your account to open and maintain a leveraged position. Understanding margin is critical to avoiding margin calls and liquidation.

What Is Margin?

Margin is not a fee or a cost. It is a deposit — a good-faith collateral that your broker holds to cover potential losses.

Required Margin

The amount of margin required depends on:
1. Position size (how many units you are trading)
2. Leverage (what your broker offers)
3. The currency pair (some require higher margin)

Calculation: Margin = Position Size ÷ Leverage

Example:
- Trading 1 mini lot (10,000 units) of EUR/USD
- Leverage: 1:100
- Required margin: 10,000 ÷ 100 = $100

Used Margin vs Free Margin

Your account balance is split into two parts:
- Used Margin: the amount currently locked in open positions
- Free Margin: the amount available to open new positions

If your account is $1,000 and you have $300 in used margin, your free margin is $700.

Margin Level

Margin Level = (Equity ÷ Used Margin) × 100%

- Margin level above 100%: You have open positions with available equity
- Margin level at 100%: You have no free margin left
- Margin level below 100%: You are in margin call territory

Margin Call and Stop Out

Margin Call: When your margin level drops below the broker's threshold (usually 100%). The broker will warn you to add funds or close positions.

Stop Out: When your margin level drops even further (usually 50%). The broker will automatically close your weakest positions to protect themselves and prevent negative balance.

Example Walkthrough

Account balance: $500
Open position: 1 mini lot EUR/USD at 1.1050
Used margin: $100 (at 1:100)
Margin level: 500/100 = 500%

Price moves 50 pips against you: -$50
Equity: $450
New margin level: 450/100 = 450%

Price moves 400 pips against you: -$400
Equity: $100
New margin level: 100/100 = 100% (MARGIN CALL)

Any further movement against you triggers the broker to close your trade.

Margin in Practice

For Ethiopian traders:
- Always maintain a margin level above 300% (buffer for volatility)
- Never open positions that use more than 30% of your account as margin
- Remember that gold (XAU/USD) requires more margin than EUR/USD at most brokers
- Factor in spreads widening during news events — they reduce your effective margin level

Common Mistake: Opening too many positions at once. Each position consumes margin. Five small positions can use more margin than one medium position and be harder to manage.

Margin is not the same as risk. You can lose your entire margin deposit if the trade moves against you. Proper position sizing (covered in a later lesson) is how you control actual risk.

Position sizing is the calculation that determines exactly how many units to trade. It is your most important risk management tool.

The Formula: Position Size = (Account Balance × Risk %) ÷ (Stop Loss in Pips × Pip Value)

Example: $1,000 account, 2% risk ($20), 50-pip stop, $1 pip value (mini lot)
Position = $20 ÷ (50 × $1) = 0.4 mini lots (4,000 units)

Adjusting for Stop Loss Distance:
Wider stops mean smaller positions. A 100-pip stop halves your position size vs a 50-pip stop. This is why position sizing works — it automatically adjusts for volatility.

For gold (XAUUSD), stops are typically wider (100-200 pips) so position sizes will be smaller. A $1,000 account with 2% risk and a 150-pip gold stop trades just 0.013 standard lots.

Never enter a trade without knowing your exact position size. Use a calculator until the formula becomes automatic.

Order types determine how and when your trade is executed. Understanding each type is essential for proper trade management.

Market Order: Executes immediately at the current price. Use when you want to enter or exit instantly. The downside is you may get a worse price during fast markets.

Limit Order: Executes at a specified price or better. Use to enter on a pullback or take profit at a target. Guarantees price but not execution.

Stop Order: Becomes a market order when price reaches a specified level. Use to enter breakouts or set stop losses. Stop-loss orders protect your account.

Stop Limit Order: A stop order that becomes a limit order instead of a market order. Useful in volatile markets to control slippage.

Trailing Stop: A stop loss that automatically follows price as it moves in your favor. Locks in profits while giving the trade room.

For Ethiopian traders: Use limit orders during volatile news events to avoid slippage. On gold, spreads can widen dramatically during NFP releases — a market order might cost you 5-10 extra pips.

Interest rates are the single most important fundamental driver of currency values. Every forex trader must understand how they work.

Central banks set interest rates. When a central bank raises rates, its currency typically strengthens because higher rates attract foreign capital seeking better returns.

Key Relationships:
- Higher rates → Stronger currency (capital inflows)
- Lower rates → Weaker currency (capital outflows)
- Rate hike expectations → Currency strengthens in advance
- Rate cut expectations → Currency weakens in advance

The Federal Reserve (Fed) is the most important central bank for forex. Its decisions affect the US dollar and every major currency pair. The European Central Bank (ECB), Bank of England (BOE), and Bank of Japan (BOJ) are also significant.

Interest Rate Differentials:
The difference between two countries' interest rates determines which currency in a pair offers a carry trade advantage. If the Fed rate is 5.5% and the ECB rate is 4.0%, holding EUR/USD short pays you 1.5% annually.

For gold: Gold has no interest yield. When rates rise, gold becomes less attractive compared to interest-bearing assets. When rates fall, gold becomes more attractive. This inverse correlation is a key driver of XAUUSD.

The Non-Farm Payrolls (NFP) report is the most market-moving economic event each month. Released on the first Friday at 8:30 AM ET, it reports the number of jobs added in the US economy.

Why NFP Matters:
- It is the most timely indicator of US economic health
- It directly influences Fed interest rate decisions
- It causes the largest price spikes in forex and gold
- Every institutional trader watches it

Typical NFP Response:
- Higher than expected → USD strengthens, gold drops
- Lower than expected → USD weakens, gold rises
- In line with expectations → muted response, mean reversion

Trading NFP on Gold:
Gold can move 500-1500 pips in the minutes after NFP. Spreads blow out. Liquidity drops. Limit orders may not fill.

Three Approaches:
1. Don't trade it — wait 30 minutes for price to settle, then trade the reaction
2. Trade the retrace — wait for the initial spike to exhaust, enter in the opposite direction
3. Straddle — place buy and sell stops 200 pips above and below the current price before the release

Most new traders lose money trading news. The best approach for beginners: close all positions 15 minutes before NFP, watch the reaction, and look for trades 30-60 minutes later.

The Consumer Price Index (CPI) measures inflation — the rate at which prices for goods and services are rising. It is the second most important US economic release after NFP.

CPI and Forex:
- High CPI → Inflation rising → Fed expected to hike rates → USD strengthens
- Low CPI → Inflation falling → Fed expected to cut rates → USD weakens
- Core CPI (excludes food and energy) — the Fed's preferred measure

CPI Impact on Gold:
Gold is the ultimate inflation hedge. When CPI rises faster than expected, gold typically rallies because investors seek protection against currency devaluation. However, if high CPI leads to aggressive rate hikes, gold can initially sell off before rallying.

The relationship is nuanced:
- Moderate inflation (2-3%) → neutral for gold
- Rising inflation → bullish for gold medium-term
- Falling inflation → bearish for gold
- Stagflation (high inflation + low growth) → very bullish for gold

Trading CPI:
Like NFP, CPI causes sharp volatility. Spreads widen. The safest approach for Ethiopian traders: wait 15-30 minutes after the release, let the initial volatility settle, then trade the established direction.

Other Key Inflation Reports to Watch:
- PPI (Producer Price Index) — leading indicator for CPI
- PCE (Personal Consumption Expenditures) — the Fed's preferred inflation gauge
- Import/Export Prices — shows inflation pressure from trade

Central bank policy decisions are the biggest fundamental events in forex. They set the direction of currency values for weeks and months.

Major Central Banks and Their Codes:
- Federal Reserve (Fed) — USD
- European Central Bank (ECB) — EUR
- Bank of England (BOE) — GBP
- Bank of Japan (BOJ) — JPY
- Swiss National Bank (SNB) — CHF
- Reserve Bank of Australia (RBA) — AUD
- Bank of Canada (BOC) — CAD
- Reserve Bank of New Zealand (RBNZ) — NZD

What to Watch in Policy Statements:
1. Interest Rate Decision — actual rate change or hold
2. Dot Plot (Fed) — projections for future rates
3. Forward Guidance — language about future policy direction
4. Inflation Outlook — whether inflation is expected to persist
5. Growth Forecasts — GDP projections

Hawkish vs Dovish:
- Hawkish: indicates tighter policy (rate hikes) → currency strengthens
- Dovish: indicates looser policy (rate cuts) → currency weakens

Forward Guidance Clues:
"Holds firm" or "remains elevated" → hawkish (rates staying high)
"Beginning to moderate" or "data dependent" → neutral
"Ready to adjust" or "monitoring downside risks" → dovish

For Ethiopian traders: Central bank decisions from developed economies have no direct connection to Ethiopian economic conditions. Trade the technical reaction to the decision rather than trying to predict the outcome.

The carry trade is a strategy where you borrow a currency with a low interest rate and buy a currency with a high interest rate, profiting from the interest rate differential.

How It Works:
If the AUD rate is 4.35% and the JPY rate is 0.10%, buying AUD/JPY earns you approximately 4.25% per year in interest just for holding the position.

Popular Carry Trade Pairs:
- AUD/JPY — high yield vs low yield
- NZD/JPY — similar to AUD/JPY
- USD/MXN — US dollar vs Mexican peso (high differential)
- EUR/TRY — euro vs Turkish lira (very high risk)

Risks of Carry Trading:
1. Exchange rate risk — if AUD falls 5% against JPY, the 4.25% interest gain is wiped out
2. Leverage amplification — most traders use leverage, magnifying losses
3. Rate changes — central banks can change rates, eliminating the carry advantage
4. Risk sentiment — carry trades unwind during market stress (flying to safety)

The Yen Carry Trade:
For decades, traders borrowed cheap Japanese yen (near 0%) to buy higher-yielding assets. When the BOJ raised rates, the rapid unwinding of these carry trades caused massive volatility across all markets.

Should Ethiopian Traders Use Carry?
Carry trade is a long-term strategy requiring significant capital and patience. For most retail traders, it is better to focus on directional trading. If you hold positions overnight with a broker that pays swap, the carry earned or paid is usually small relative to daily price movement.

Fundamental analysis is the study of economic factors that drive currency values. It answers the question: which currency is likely to strengthen or weaken based on economic conditions?

The Three Pillars:
1. Economic Data — GDP, employment, inflation, retail sales, manufacturing
2. Central Bank Policy — interest rates, forward guidance, quantitative easing
3. Geopolitical Events — elections, trade wars, conflicts, natural disasters

Building a Fundamental Analysis Framework:

Step 1: Know the Economic Calendar
Use ForexFactory or Investing.com to see upcoming releases. Focus on high-impact events (red folder on ForexFactory).

Step 2: Understand Expectations vs Reality
Price moves on the DIFFERENCE between actual data and expectations. If NFP is expected at 200K and comes at 180K, USD falls even though 180K is still good.

Step 3: Assess the Big Picture
- Is the economy expanding or contracting?
- Is inflation rising or falling?
- Are central banks hiking, holding, or cutting?

Step 4: Combine with Technicals
Fundamentals tell you the direction. Technicals tell you the entry. Do not trade fundamental direction without a technical setup.

Ethiopian Trader Framework:
1. Monday: Check weekly economic calendar, note high-impact events
2. Daily: Review Asian session action before London opens
3. Before major news: Reduce position sizes or close trades
4. After news: Trade the established direction with technical confirmation

Fundamental analysis gives you a directional bias. It does not give you entry timing. That is why successful traders combine fundamentals with technical analysis — fundamentals for direction, technicals for execution.

This practice exercise section consolidates everything you have learned in the Forex Fundamentals course.

Exercise 1: Pip Calculation
EUR/USD moves from 1.1050 to 1.1090. How many pips did it move?
Answer: 40 pips (0.0040 ÷ 0.0001 = 40)

Exercise 2: Position Sizing
You have a $2,000 account. Risk per trade is 2%. Stop loss is 40 pips. Pip value for mini lot is $1. What position size?
Answer: ($2,000 × 0.02) ÷ (40 × $1) = $40 ÷ $40 = 1 mini lot (10,000 units)

Exercise 3: Margin Calculation
You trade 2 mini lots of EUR/USD at 1:100 leverage. What is the required margin?
Answer: 20,000 ÷ 100 = $200

Exercise 4: Fundamental Analysis
NFP comes out at 150K vs 200K expected. Is this bullish or bearish for USD?
Answer: Bearish — lower than expected means weaker economy, USD should fall.

Exercise 5: Risk Management
Your account is $500. You want to trade gold with a 150-pip stop. Pip value is $1 (mini lot). What's the maximum position size at 2% risk?
Answer: ($500 × 0.02) ÷ (150 × $1) = $10 ÷ $150 = 0.067 mini lots (670 units)

Daily Practice Routine:
1. Calculate pip value for your next trade before entering
2. Size every position using the formula (never guess)
3. Check margin level before and after each trade
4. Review your economic calendar daily
5. Journal the fundamental rationale for each trade`,
  ],
  'gold-mastery': [
    `XAUUSD is the symbol for spot gold traded against the US dollar. It is the most widely traded precious metal pair and the most popular instrument on FundedBirr Academy.

Why XAUUSD Is Unique

Gold is not just a commodity — it is a currency, a store of value, and a safe haven asset all in one. This gives XAUUSD properties that no other pair has:

- High liquidity — billions traded daily, tight spreads during peak hours
- Strong trends — gold moves in persistent, multi-week trends
- Clear levels — support and resistance are more reliable on gold than most currencies
- Safe haven flows — geopolitical events drive predictable gold moves
- Inflation correlation — gold trends with real interest rates

Gold Price History

Key milestones:
- 1971: Gold was $35/oz (Bretton Woods ended)
- 1980: Peak of $850/oz (inflation + Cold War)
- 2001: Low of $255/oz (tech boom)
- 2011: Peak of $1,920/oz (financial crisis aftermath)
- 2015: Low of $1,050/oz (rate hike fears)
- 2020: All-time high above $2,075/oz (COVID-19)
- 2024: Multiple all-time highs above $2,400/oz

Gold vs Currency Pairs

Gold behaves differently from forex pairs:
- No central bank directly controls gold (but Fed policy affects it)
- No interest rates on gold (no carry trade)
- Physical demand (jewellery, central banks) creates support levels
- Seasonal patterns exist (Indian wedding season, Chinese New Year)

Trading XAUUSD

A standard lot of gold is 100 troy ounces.
- 1 pip of gold movement = $0.01 price move
- 1 standard lot: 1 pip = $10
- 1 mini lot: 1 pip = $1

Gold typically moves 1,000-3,000 pips daily on average (intraday range of $10-30).

Ethiopian traders prefer gold because:
- Most active during London/NY session (daytime in Ethiopia)
- Less correlated with local economic factors
- Clear technical patterns due to high participation
- Better spreads than exotic currency pairs

Gold is not just another instrument — for many Ethiopian traders, it is the primary instrument. Mastery of XAUUSD opens the door to consistent trading.

In the next lesson, we will explore market structure — the foundation of all technical analysis for gold trading.`,
    `Market structure is the framework of highs and lows that price creates as it moves. Understanding structure is the first step to reading any chart, especially gold.

What Is Market Structure?

Price moves in waves — making higher highs and higher lows in uptrends, and lower highs and lower lows in downtrends. These swing points create the structure of the market.

The Three Market Conditions

1. Uptrend (Bullish)
- Structure: Higher Highs (HH) and Higher Lows (HL)
- Price makes new highs above previous highs
- Pullbacks stay above previous lows
- Strategy: Buy on pullbacks to Higher Lows

2. Downtrend (Bearish)
- Structure: Lower Highs (LH) and Lower Lows (LL)
- Price makes new lows below previous lows
- Bounces stay below previous highs
- Strategy: Sell on bounces to Lower Highs

3. Range (Sideways)
- Structure: Equal highs and equal lows
- Price bounces between clear support and resistance
- Strategy: Buy at support, sell at resistance

Swing Points

A swing high is a candle with lower highs on both sides. A swing low is a candle with higher lows on both sides.

Swing highs become resistance if broken. Swing lows become support if broken.

Structure on Gold (XAUUSD)

Gold tends to form very clean market structure because:
- Large institutional participants trade gold in size, creating clear levels
- Gold trends are persistent — ranging lasts less time than trending
- 24-hour session means structure develops continuously

Identifying Structure on Gold

Step 1: Open the 1-hour chart (best timeframe for structure)
Step 2: Look left and identify the most recent swing highs and lows
Step 3: Label them: HH, HL (uptrend) or LH, LL (downtrend)
Step 4: Mark the most recent 3-4 swing points on each side
Step 5: Draw trend lines connecting the highs and lows

Structure Trading on Gold

In an uptrend: Wait for a pullback to a Higher Low. Look for a bullish reversal pattern (hammer, engulfing). Enter long with a stop below the swing low.

In a downtrend: Wait for a bounce to a Lower High. Look for a bearish reversal pattern (shooting star, engulfing). Enter short with a stop above the swing high.

In a range: Buy at support with stop below. Sell at resistance with stop above.

Common Mistakes

- Drawing structure on too low a timeframe (5-min charts have too much noise)
- Ignoring the higher timeframe trend (always check 4H and Daily first)
- Forcing structure where none exists (sometimes the market is truly random)
- Not updating structure as new swings develop

Gold structure is typically cleaner than forex pairs. Spend 10 minutes daily marking structure on the XAUUSD 1-hour chart. After two weeks, you will see the market differently.

Order blocks are institutional price levels where large buyers or sellers have placed significant orders. They are the footprints of smart money on your chart.

What Is an Order Block?

An order block is a specific candle or group of candles where institutional traders (banks, hedge funds, central banks) have placed large pending orders. These levels act as strong support or resistance.

Unlike retail traders who use limit orders, institutions must execute large orders over time. They cannot buy or sell millions at once without moving the price against themselves. They leave their footprints in the form of order blocks.

Identifying Order Blocks

Bullish Order Block:
- Look for the last bearish candle before a strong upward move
- This candle represents the final selling before institutions started buying
- If price returns to this candle's range, it is likely to bounce

Bearish Order Block:
- Look for the last bullish candle before a strong downward move
- This candle represents the final buying before institutions started selling
- If price returns to this candle's range, it is likely to reverse

Order Blocks vs Support/Resistance

Order blocks are different from regular support and resistance:
- They are based on specific candles, not horizontal levels
- They show WHERE institutions entered, not just WHERE price reversed
- They are more precise — typically 10-20 pips wide
- They are based on market mechanics, not visual patterns

Order Blocks on Gold

Gold's deep liquidity makes order blocks particularly effective:
- Institutions trade gold in massive size, leaving clear footprints
- Order blocks on the 1-hour chart often hold for days
- Gold tends to respect order blocks more precisely than currencies
- Multiple order blocks at the same level = very strong support/resistance

How to Trade Order Blocks

1. Identify an order block on the 1-hour or 4-hour chart
2. Wait for price to return to the order block zone
3. Look for confirmation: a reversal candlestick pattern
4. Enter with stop loss below/above the order block
5. Target the next order block or swing point

Example on Gold:
- A bullish order block forms at 1950.00
- Price rallies to 1980.00, then pulls back
- Price returns to 1950.00 and forms a hammer
- Entry: Buy at 1952.00 (confirmation)
- Stop: Below 1947.00 (below the order block)
- Target: 1980.00 (previous swing high)

Order blocks work on any timeframe but are most reliable on the 1-hour and above. Lower timeframes (15-min and below) have too many false signals.

Liquidity zones are areas on the chart where a high volume of stop losses and pending orders are clustered. Institutions routinely push price into these zones to fill their own large orders.

Two Types of Liquidity:
1. Buy-side Liquidity — stop losses above swing highs (shorts getting stopped out)
2. Sell-side Liquidity — stop losses below swing lows (longs getting stopped out)

How Institutions Use Liquidity:
Institutions know where retail stop losses are clustered. They push price to those levels to trigger stops, which provides the liquidity they need to enter or exit their own large positions.

Identifying Liquidity Zones on Gold:
- Look for obvious swing highs and lows on the 1-hour chart
- Draw a horizontal line at the exact high or low
- These are the most likely levels where stops are clustered
- Gold frequently spikes 5-15 pips above a swing high before reversing — this is a liquidity grab

Liquidity Grab Pattern:
1. Price approaches a swing high
2. Spikes 5-15 pips above it (triggering buy-side stops and FOMO entries)
3. Immediately reverses and drops 50+ pips
4. Institutions used the liquidity to enter short positions

Trading Liquidity Zones:
- Mark key swing highs and lows daily
- Wait for price to approach these levels
- Look for rejection (wick) at the level
- Enter in the direction of the rejection
- Stop loss beyond the liquidity zone (give it 15-20 extra pips)

On gold, liquidity grabs happen most frequently during the London and New York session overlaps. Mastering this concept will dramatically improve your entries.

DXY (US Dollar Index) measures the value of the US dollar against a basket of six major currencies: EUR, JPY, GBP, CAD, SEK, CHF. It is the most important external indicator for gold trading.

The Inverse Correlation:
Gold and DXY typically move in opposite directions. When the dollar strengthens, gold falls. When the dollar weakens, gold rises.

Understanding the Correlation:
DXY up 0.5% → Gold often down 0.3-0.8%
DXY breaks resistance → Gold likely to break support
DXY forms a double top → Gold likely to form a double bottom

Why This Correlation Exists:
Gold is priced in US dollars. When the dollar strengthens, it takes fewer dollars to buy the same ounce of gold. Additionally, a stronger dollar makes gold more expensive for non-US buyers, reducing demand.

Correlation Exceptions:
The inverse relationship is not perfect. During extreme risk-off events (banking crises, wars), both gold and USD can rise simultaneously as investors flee to safety.

Using DXY in Your Gold Trading:
1. Check DXY daily before trading gold
2. If DXY is in a clear uptrend, prefer short gold trades
3. If DXY is in a clear downtrend, prefer long gold trades
4. Watch for DXY support/resistance breaks as leading indicators for gold moves
5. Use DXY divergence: if gold falls but DXY stays flat, the fall may be a fakeout

Practical Ethiopian Trader Tip:
You can view DXY on most trading platforms (symbol: DXY or USDX). Keep a DXY chart open alongside your XAUUSD chart. When you see a strong DXY move, expect an opposite reaction in gold within 5-15 minutes.

Gold does not trade in isolation. It has strong correlations with other commodities and financial instruments.

Gold and Oil (XAUUSD vs USOIL):
- Moderate positive correlation (0.4-0.5)
- Both driven by USD strength and global demand
- Oil price surges can signal inflation → bullish for gold
- Different drivers: oil is industrial, gold is monetary

Gold and Silver (XAUUSD vs XAGUSD):
- Strong positive correlation (0.7-0.8)
- Silver is more volatile than gold (2-3x beta)
- Silver leads gold in bull markets
- Gold-silver ratio is a key indicator (normal range 60-80)

Gold and Bond Yields:
- Inverse correlation with real yields (yield minus inflation)
- When real yields fall, gold rises
- When real yields rise, gold falls
- 10-year Treasury yield is the most important to watch

Gold and Equities (S&P 500):
- Generally positive correlation in risk-on environments
- Inverse correlation during crisis events
- Both rally on Fed easing
- Gold outperforms during market crashes

Commodity Currencies:
- AUD, NZD, CAD are positively correlated with gold
- When gold rallies, these currencies tend to strengthen
- Useful for confirmation when trading gold-related forex pairs

Practical Application:
1. Check gold-silver ratio daily — ratio above 85 suggests silver undervalued
2. Monitor 10-year real yield trend — falling = bullish for gold
3. Use oil price direction as a secondary inflation indicator
4. When S&P 500 and gold both rally, it is a risk-on environment

Each trading session affects gold differently. Understanding the behavior of gold in each session helps you choose the best time to trade.

Asian Session (00:00-09:00 GMT):
- Gold typically ranges in a tight 200-400 pip band
- Low volatility, lower liquidity
- Price often sets the "opening range" for the day
- Breakouts during Asian session are often fakeouts
- Best for: patience and watching, not aggressive trading

London Session (08:00-17:00 GMT):
- Gold volume spikes significantly
- Typical daily range: 500-1500 pips
- Best directional moves happen here
- London fix (10:30 GMT) creates a volatility spike
- Best for: trend trading and breakout strategies

New York Session (13:00-22:00 GMT):
- Highest volatility period
- US economic data releases create sharp moves
- Gold often makes its high or low of the day during NY
- Best for: news trading and momentum strategies

Session Overlap (London + NY: 13:00-17:00 GMT):
- Peak volatility and liquidity
- Gold can move 1000+ pips in 2 hours
- Most institutional trading happens here
- Best entries and exits occur during this period

For Ethiopian Traders (EAT = GMT+3):
- London Session: 10:00-19:00 EAT ✓ best time
- New York Open: 16:00 EAT ✓ easily accessible
- Asian Session: 03:00-12:00 EAT ✗ early morning
- Peak overlap: 16:00-20:00 EAT ← your optimal trading window

Structure your trading day around these sessions. Do your analysis during Asian session (low volatility), execute during London/NY overlap (high volatility), and avoid trading in the last hour before a major news event.

The Asian Range strategy is a simple but effective approach for trading gold during the lowest volatility period of the day.

What Is the Asian Range?
The Asian Range is the high and low of gold price during the Asian trading session (00:00-09:00 GMT). For Ethiopian traders, this is approximately 03:00-12:00 EAT.

Strategy Rules:
1. Identify the Asian Range: mark the high and low of price between 00:00-09:00 GMT
2. Do not trade during the Asian session (low liquidity, false breakouts)
3. Wait for London open at 08:00 GMT
4. If price breaks ABOVE the Asian Range high during London → go long
5. If price breaks BELOW the Asian Range low during London → go short
6. Stop loss: beyond the opposite side of the range
7. Take profit: 1x to 2x the Asian Range width

Example:
- Asian Range: high 1965.00, low 1955.00 (10.0 range)
- London opens, price breaks above 1965.00 → Enter long at 1966.00
- Stop: below 1955.00 (the low)
- Target: 1965.00 + 10.0 = 1975.00 or 1985.00 (1x or 2x range)

Why This Works:
- The Asian Range represents consolidation
- A breakout during London high-volume session confirms direction
- Institutions often use the Asian Range as their reference for the day
- Success rate: approximately 65-70% on gold

The London Breakout strategy trades the initial volatility spike when London opens and institutional volume floods the market.

London Open Setup:
1. Mark the Asian Range high and low (first 8 hours of the day)
2. At London open (08:00 GMT / 10:00 EAT), wait 15 minutes
3. Identify which direction price breaks from the Asian Range
4. Enter on the first pullback after the breakout (not the breakout itself)

Entry Refinement:
Instead of buying the breakout at market, wait for a pullback to:
- The Asian Range high/low (now acting as support/resistance)
- A key moving average (20 EMA on 5-min chart)
- A 50% retracement of the breakout move

Stop Loss Placement:
- Below the Asian Range low (for long trades)
- Above the Asian Range high (for short trades)
- Or 1.5x ATR from entry

Take Profit Levels:
- TP1: 1x Asian Range width (quick partial)
- TP2: 2x Asian Range width (core position)
- TP3: Run until London session close or a structure break

Example on Gold:
- Asian Range: 1940-1955 (15.0 range)
- London open: price breaks above 1955, pulls back to 1952
- Entry: long at 1952
- Stop: 1935 (below Asian low)
- TP1: 1967 (1952 + 15)
- TP2: 1982 (1952 + 30)
- TP3: let run with trailing stop

Best Sessions for This Strategy:
- Most effective on Monday-Thursday
- Avoid Fridays (positions may gap over weekend)
- Best when Asian Range is at least 5 pips wide (below 5 pips is too tight)

New York Momentum strategy focuses on trading the directional move that follows US economic data releases and the NY session open.

Key Concept:
The New York session (13:00 GMT / 16:00 EAT) brings US market participants into the market. This surge in volume often creates sustained directional moves in gold.

New York Open Strategy:
1. Do your analysis during the London session (10:00-16:00 EAT)
2. Identify the London session range (high and low from 08:00-13:00 GMT)
3. At NY open (13:00 GMT / 16:00 EAT), watch for:
   - A continuation of the London direction
   - A reversal of the London direction (rotation)
4. Enter in the direction of the NY open impulse
5. Use the London range high/low as support/resistance

News-Driven Momentum:
When US economic data is released at 13:30 GMT (NFP, CPI, Retail Sales):
- Gold reacts within 1-5 seconds
- Initial spike is often the WRONG direction (liquidity grab)
- The real direction establishes within 5-15 minutes
- Strategy: wait 15 minutes, identify the trend, enter on retracement

Momentum Indicators for Gold:
- RSI (14, 1H chart): above 70 = overbought, below 30 = oversold
- MACD: bullish cross = momentum up, bearish cross = momentum down
- Volume: increasing volume confirms the move
- ATR: expanding ATR = momentum building

Entry Techniques:
1. Breakout entry: Enter when price breaks a clear level with volume
2. Pullback entry: Wait for a 38-50% retracement of the initial impulse
3. Moving average entry: Enter when price touches 20 EMA on 15-min chart

For Ethiopian traders: NY session aligns perfectly with evening hours (16:00-00:00 EAT). This is the highest-probability trading window for gold.

News trading requires a different approach than regular technical trading. The key is preparation and risk management.

Before the News:
1. Know the schedule — mark high-impact events on your calendar
2. Check expectations (ForexFactory consensus)
3. Reduce position sizes or close all open positions 15 minutes before
4. Decide your strategy in advance (don't decide during the news)

Trading the Initial Spike (Not Recommended for Beginners):
- Place two pending orders: buy stop and sell stop, 200-300 pips from current price
- The triggered order catches the initial move
- Risk: the spike can reverse immediately, hitting both orders
- Only use this if you have experience and can watch the screen

Trading the Reaction (Recommended):
1. Wait 15-30 minutes after the release
2. Let the initial spike and retracement play out
3. Identify the established direction
4. Enter on a pullback to a technical level
5. Use a wider stop (200-300 pips) to account for volatility

News-Specific Gold Moves:
- NFP: gold typically moves 800-2000 pips in 60 minutes
- CPI: gold moves 500-1000 pips in 30 minutes
- Fed Rate Decision: gold moves 1000-3000 pips in 2 hours
- FOMC Minutes: gold moves 400-800 pips in 30 minutes

Risk Management for News Trades:
- Risk only 1% per trade (not 2%)
- Use limit orders to avoid slippage
- Consider not trading the first 5 minutes
- Close partial position at 1:1 risk-to-reward
- Let the rest run with a trailing stop

Key Lesson: On high-impact news days, gold can move an entire week's range in one hour. Being prepared and patient is more important than being first.

Gold and inflation have a deep, long-term relationship that every gold trader must understand.

How Inflation Affects Gold:
When inflation rises, the purchasing power of fiat currency declines. Investors turn to gold as a store of value, driving prices higher.

The Real Yield Connection:
Gold's primary driver is real yields (nominal yield minus inflation).
- Real yields falling → gold rising (current scenario in many markets)
- Real yields rising → gold falling

Why Real Yields Drive Gold:
- Gold pays no interest
- When real yields are low or negative, holding gold has no opportunity cost
- When real yields are high, investors prefer yield-bearing assets over gold

Inflation Regimes and Gold:
- Low inflation (0-2%): Gold trades on technicals and USD moves
- Moderate inflation (2-4%): Gold trends slowly higher
- High inflation (4-6%): Gold rallies strongly
- Hyperinflation (>10%): Gold skyrockets but with extreme volatility

Current Context for Ethiopian Traders:
Ethiopia faces its own inflation challenges. Local inflation makes gold ownership attractive. However, trading XAUUSD on international markets is about global inflation, not local.

Inflation Indicators to Watch:
1. CPI (Consumer Price Index) — monthly, most watched
2. PCE (Personal Consumption Expenditures) — Fed's preferred gauge
3. PPI (Producer Price Index) — leading indicator
4. Average Hourly Earnings — wage inflation
5. Michigan Inflation Expectations — consumer sentiment on future inflation

Trading Inflation Data:
- Higher CPI = short-term gold volatility rally
- But if high CPI leads to hawkish Fed = medium-term gold weakness
- The key is whether the data confirms or challenges the current trend

Gold thrives in inflationary environments. When real yields turn negative, gold becomes one of the best-performing assets.

Geopolitical events are unpredictable but consistently move gold prices. Understanding how gold reacts to different types of events helps you position correctly.

Gold as a Safe Haven:
During geopolitical uncertainty, investors buy gold for protection. This demand drives prices higher regardless of technical levels or other fundamentals.

Types of Geopolitical Events:

1. Military Conflicts (War, Invasion):
- Gold rallies sharply (2-5% in days)
- Rally is often front-loaded (biggest move on day 1)
- After initial shock, gold often settles higher but volatile
- Examples: Russia-Ukraine 2022, Middle East conflicts

2. Trade Wars / Tariffs:
- Gold rallies gradually
- Uncertainty drives sustained buying
- Affected currencies weaken, boosting gold in those terms
- Examples: US-China trade tensions

3. Elections / Political Transitions:
- Gold may rally before uncertain elections
- Results often cause sharp reversals
- Key: watch for unexpected outcomes
- Examples: US presidential elections, Brexit referendum

4. Banking / Financial Crises:
- Gold rallies strongly
- Dollar may also rally (contradicting normal correlation)
- Systemic risk drives extreme safe-haven flows
- Examples: 2008 financial crisis, 2023 regional banking crisis

5. Sanctions / Trade Restrictions:
- Gold rallies if sanctions threaten global trade flows
- Central banks increase gold reserves during sanctions
- Example: Russian central bank asset freezes

Trading Geopolitical Events:
1. Don't try to predict the event — trade the reaction
2. Use a wider stop (volatility is 2-3x normal)
3. Reduce position size (events can reverse violently)
4. Watch Gold volatility index (GVZ) for expected range
5. Consider buying options instead of spot (limited downside)

For Ethiopian traders: Geopolitical events happen regardless of local conditions. Maintain awareness of global news, but focus on trading the technical reaction after the initial volatility settles.

Risk management for gold is different from forex. Gold's higher volatility and wider stops require specific position sizing.

Why Gold Needs Different Risk Management:
- Gold moves 2-10x more pips than major forex pairs
- A 50-pip stop on EUR/USD is normal; on gold it will get hit daily
- Spreads widen more on gold during news
- Gap risk (weekend opens) is higher on gold

Gold-Specific Position Sizing Formula:
Position Size = (Account × Risk %) ÷ (Stop Pips × Pip Value)

Example: $1,000 account, 2% risk ($20), 150-pip stop, $10 pip (standard lot)
= $20 ÷ (150 × $10) = 0.013 standard lots (1.3 mini lots or 13 micro lots)

Recommended Gold Parameters:
- Account $500: max 0.05 standard lots (5 micro lots)
- Account $1,000: max 0.10 standard lots (10 micro lots)
- Account $3,000: max 0.30 standard lots
- Account $5,000: max 0.50 standard lots

Stop Loss Guidelines for Gold:
- Day trading: 100-200 pip stop (tight range for gold)
- Swing trading: 300-500 pip stop (wider for position trades)
- News trading: 300-500 pip stop (volatility buffer)
- Never use a stop under 80 pips on gold during London/NY

Max Risk Per Day:
Gold can hit multiple stops in one day. Set a daily loss limit:
- Daily max loss: 3-5% of account
- After hitting it, stop trading for the day
- Gold gives you opportunities every day — don't chase losses

Drawdown Management:
- If gold drops you 10% in a week, reduce position sizes by 50%
- If you hit 20% drawdown, stop trading gold for 2 weeks
- Review your trades and adjust your approach
- Return with smaller size

Gold is not more dangerous than forex — it just needs different risk parameters. Respect the volatility and size accordingly.

Position sizing for XAUUSD requires precise calculation due to gold's unique pip structure and higher volatility.

Gold Pip Value Refresher:
- 1 standard lot XAUUSD = 100 troy ounces
- 1 pip (price movement) = $0.10 per ounce
- Standard lot pip value: 100 × $0.10 = $10 per pip
- Mini lot pip value: 10 × $0.10 = $1 per pip
- Micro lot pip value: 1 × $0.10 = $0.10 per pip

Step-by-Step Gold Position Sizing:

Step 1: Determine Account Risk
$2,000 account × 2% = $40 max risk per trade

Step 2: Set Stop Loss Distance
Gold day trade: 150 pips stop
Gold swing trade: 350 pips stop

Step 3: Choose Your Lot Size
Mini lot = $1/pip, 150 pip stop = $150 risk ($40 budget → too big)
Micro lot = $0.10/pip, 150 pip stop = $15 risk ($40 budget → fits)

Step 4: Fine-Tune
Adjust between micro and mini lots:
0.4 mini lots (4 micro lots) = $0.40/pip, 150 pips = $60 risk → too much
0.27 mini lots (2.7 micro lots) = $0.27/pip, 150 pips = $40 risk ✓

Quick Reference (2% risk, 150-pip stop):
- $500 account → 0.07 mini lots (0.7 micro lots) → $0.07/pip
- $1,000 account → 0.13 mini lots (1.3 micro lots) → $0.13/pip
- $2,000 account → 0.27 mini lots (2.7 micro lots) → $0.27/pip
- $5,000 account → 0.67 mini lots (6.7 micro lots) → $0.67/pip

Common Mistakes:
- Using standard lot calculations on gold (pip value is different)
- Setting stops too tight and getting stopped out by normal noise
- Not adjusting for wider spreads during London/NY overlap

Always calculate your gold position size before entering. Gold's pip values can be confusing at first — use a position size calculator until it becomes second nature.

Trade management is how you handle a trade after entry. It determines whether winning trades stay winners and whether losses stay small.

The Three Phases of a Trade:

Phase 1: Entry to Breakeven
- The most dangerous part of the trade
- Price may retest your entry level
- Do not move your stop loss closer during this phase
- Let the trade breathe — gold noise can hit tight stops

Phase 2: Breakeven to Target 1
- Once price moves 1x your stop distance, move stop to entry (breakeven)
- The trade is now risk-free
- Let it run toward your first target
- Consider taking 30-50% profit at TP1

Phase 3: Target 1 to Target 2
- Move stop to trail 50% of the way
- Let remaining position run
- Gold can trend for days — do not exit everything too early
- Use trailing stop (50 pips behind price on 15-min chart)

Tracking Your Stop:
- Never widen your stop (only tighten or trail)
- Move stop to breakeven after price reaches 1:1 risk-to-reward
- Trail stop every time gold moves 200 pips in your favor
- On news events, keep stop wider than normal

Adding to Winners:
- Only add to a position that is already in profit
- Add 50% of original size after a successful pullback
- Move stop for the entire position to breakeven after adding
- Maximum: 2 additions per position

Trade Management on Gold:
Gold trends are stronger and last longer than forex trends. Avoid the temptation to take profit too early. Let your winners run with a trailing stop.

Journaling is the practice of recording every trade with detailed notes. It is the fastest way to improve as a trader.

What to Record:
1. Date and time
2. Instrument (XAUUSD)
3. Trade direction (long/short)
4. Entry price, stop loss, take profit
5. Position size and risk amount ($)
6. Setup type (order block, liquidity grab, Asian breakout, etc.)
7. Screenshot of the chart with your analysis marked
8. Emotional state before entering
9. What went right or wrong
10. Lesson learned

Trade Journal Template:

Date: 2026-06-08 | Time: 16:30 EAT
Instrument: XAUUSD | Direction: Long
Entry: 1952.00 | Stop: 1937.00 | TP1: 1967.00 | TP2: 1982.00
Size: 0.27 mini lots | Risk: $40 (2%)
Setup: Asian range breakout, London session confirmation
Emotion: Slight anxiety (within normal range)
Outcome: TP2 hit, +$81 (4% gain)
Lesson: Setup aligned with higher timeframe trend — trust the confluence

Using Your Journal:
- Review weekly (not daily — too much noise)
- Look for patterns: which setups win most? Which times of day?
- Track your win rate and average risk-to-reward
- Identify emotional patterns (revenge trading, FOMO)
- Adjust your strategy based on data, not feelings

Free Tools for Journaling:
- Google Sheets (simple template)
- TradersVue or Edgewonk (advanced)
- Notion or Obsidian (flexible)
- Pen and paper (surprisingly effective)

The best traders have the best journals. Your journal is your trading edge — it turns experience into measurable improvement.

The Full System Review ties together every concept from Gold Trading Mastery into a practical daily routine.

Daily Gold Trading Routine:

Pre-Market (Asian Session, 03:00-12:00 EAT):
1. Check daily chart structure (uptrend, downtrend, or range)
2. Identify key support/resistance levels
3. Calculate Asian Range (high and low)
4. Check DXY direction
5. Review economic calendar for news events
6. Note any overnight geopolitical news

Market Open (London, 10:00-12:00 EAT):
7. Watch how gold breaks from Asian Range
8. Identify order blocks and liquidity zones on 1-hour chart
9. Wait for a clear technical setup before trading
10. Never force a trade — if no setup, wait

Execution (London-NY Overlap, 16:00-20:00 EAT):
11. Enter only when your setup aligns with higher timeframe trend
12. Calculate exact position size (2% max risk)
13. Set stop loss at a technical level (not an arbitrary distance)
14. Set take profit at 1:2 or 1:3 risk-to-reward
15. Log the trade in your journal

Post-Market (After 20:00 EAT):
16. Review all open positions
17. Adjust stops if needed
18. Journal completed trades
19. Relax — do not check charts again until next session

Weekly Review (Sunday):
20. Review all journal entries from the week
21. Calculate weekly P&L in pips and dollars
22. Identify patterns and areas for improvement
23. Plan the week ahead based on economic calendar
24. Adjust strategy based on data

Core Principles for Gold Success:
1. Higher timeframe is always right — check daily/4H before trading
2. Trade with the trend — pullbacks are entries, not reversals
3. Risk management first — position size before entry
4. Let winners run — gold trends are persistent
5. Journal everything — data beats intuition

You now have a complete gold trading system. Apply it consistently for 90 days and your trading will transform.`,
  ],
  'risk-management': [
    `Risk management is the single most important skill in trading. It matters more than your entry strategy, your exit strategy, or your market analysis.

The Golden Rule

"Never risk more than 1-2% of your trading account on any single trade."

This simple rule is the difference between surviving in this market and being forced out permanently.

Why Risk Management Matters More Than Entries

Consider two traders:
- Trader A: Has a random entry method but risks only 1% per trade
- Trader B: Has a 70% win rate but risks 10% per trade

After 10 trades:
- Trader A (1% risk, random 50% win rate): Account at roughly 100%
- Trader B (10% risk, 70% win rate): Even with 7 wins, 3 losses of 10% = drawdown of ~27%

Now extend to 50 trades:
- Trader A: Still trading, learning, improving
- Trader B: Most likely blown up or severely damaged

The Math of Ruin

Your probability of ruin depends on:
- Win rate of your strategy
- Risk per trade
- Number of trades

With 2% risk per trade and a 50% win rate: 1 in 10,000 chance of ruin after 100 trades
With 10% risk per trade and a 50% win rate: 1 in 3 chance of ruin after 100 trades

The difference is dramatic. Small changes in risk per trade have enormous effects on survival.

The Risk Management Framework

A complete risk management system has five components:
1. Position Sizing — how many units to trade based on risk
2. Stop Loss — where to exit if the trade goes against you
3. Risk-Reward Ratio — minimum profit target relative to risk
4. Maximum Drawdown — how much you are willing to lose in a period
5. Portfolio Risk — total risk across all open positions

Ethiopian Trader Considerations

For Ethiopian traders, risk management is even more critical because:
- Depositing additional funds can be difficult due to currency controls
- Broker access may be limited
- Inflation erodes the value of idle funds
- The psychological impact of losses is higher when money is hard to replace

Key Takeaway

You can be wrong 60% of the time and still be profitable with proper risk management. You can be right 90% of the time and go broke without it.

In the next lesson, we will learn the exact formula for position sizing — the mathematical foundation of risk management.`,
    `Position sizing is the calculation that determines how many units to trade based on your account size, risk per trade, and stop loss distance.

The Position Sizing Formula

Position Size = (Account Balance × Risk %) ÷ (Stop Loss in Pips × Pip Value)

Step-by-Step Example

Account: $1,000
Risk: 2% ($20)
Stop Loss: 50 pips
Pip Value: $1 per pip (mini lot EUR/USD)

Position Size = ($1,000 × 0.02) ÷ (50 × $1)
Position Size = $20 ÷ $50
Position Size = 0.4 mini lots (4,000 units)

This means you trade 0.4 mini lots. If stopped out, you lose exactly $20 (2% of your account).

Why This Matters

Without position sizing, traders make dangerous mistakes:
- Taking the same lot size regardless of stop loss distance
- Trading larger sizes when feeling confident
- Reducing size when scared (often when they should be adding)
- Using fixed lot sizes that risk too much

Position Sizing for Different Account Sizes

Account $100, risk 2% ($2), 50-pip stop, mini lot pip = $1
Position: $2 ÷ $50 = 0.04 mini lots (400 units) — use micro lots

Account $500, risk 2% ($10), 50-pip stop, mini lot pip = $1
Position: $10 ÷ $50 = 0.2 mini lots (2,000 units)

Account $5,000, risk 2% ($100), 40-pip stop, standard lot pip = $10
Position: $100 ÷ (40 × $10) = 0.25 standard lots (25,000 units)

Adjusting for Stop Loss Distance

Wider stops mean smaller positions. Narrower stops mean larger positions.

- 20-pip stop: position size DOUBLES (tight stop, higher risk of being hit)
- 100-pip stop: position size HALVES (wider stop, less likely to be hit)
- 50-pip stop: standard position size

This is why position sizing is superior to fixed lot sizes — it automatically adjusts for volatility.

Gold Position Sizing

For gold (XAU/USD):
- Pip value for standard lot = $10
- Gold typically moves more pips than forex (100-300 pip daily range)
- Use wider stops (100-200 pips)
- Position size will be smaller than forex trades

Example: $1,000 account, risk 2%, 150-pip stop on gold
Position = ($1,000 × 0.02) ÷ (150 × $10) = $20 ÷ $1,500 = 0.013 standard lots

This is a tiny position — only 1.3 mini lots. That is normal for gold with wider stops.

Position Sizing Tools

Use a position size calculator (many free online) until the formula becomes second nature. Never enter a trade without knowing your exact position size.

In the next lesson, we will cover stop loss placement — where to put your stop for maximum effectiveness.`,
    `The stop loss is your most important risk management tool. It defines your maximum loss on each trade before you enter.

Why Stop Losses Are Essential

Without a stop loss:
- A single trade can wipe out your entire account
- Emotional decision making takes over when price moves against you
- You hold losing trades hoping they will turn around
- Small losses become catastrophic losses

The smart money always uses stops. Retail traders who refuse to use stops are the ones who fund professional traders' profits.

Where to Place Stop Losses

Technical Stop Placement (Recommended)
- Below the most recent swing low (long trades)
- Above the most recent swing high (short trades)
- Below support level (long trades)
- Above resistance level (short trades)
- Below an order block (long trades)

Fixed Pip Stop
- Set a fixed number of pips based on volatility
- Example: 50 pips for EUR/USD, 100 pips for XAU/USD
- Simpler but less precise than technical placement

Volatility-Based Stop
- Use ATR (Average True Range) indicator
- Set stop at 1.5x to 2x ATR
- Automatically adjusts for current market conditions

Golden Rules of Stop Losses

1. Set your stop before you enter the trade
2. Never widen your stop once the trade is open (only tighten)
3. Never move your stop further away from entry
4. Do not place stops at obvious levels (institutions hunt these)
5. Give the trade room to breathe — stops too tight get taken out too often

Stop Loss and Position Sizing

Your stop loss distance determines your position size. Wider stops = smaller positions.

If your analysis requires a 100-pip stop but your risk per trade is fixed, you must use a smaller position size. Never adjust your stop distance to fit a desired position size.

Common Stop Loss Mistakes

Mistake 1: Placing stops too tight
Price often spikes through levels before reversing. A 5-pip stop is almost guaranteed to be hit.

Mistake 2: Placing stops at obvious round numbers
If everyone has a stop at 1900.00, institutions will push price to 1899.99 to trigger those stops before reversing.

Mistake 3: Not using stops at all
The most dangerous mistake. Always use a stop, even on demo accounts. Build the habit.

Stop Losses for Gold

Gold requires wider stops than currency pairs:
- Gold is more volatile (~1,500 pip daily range vs ~80 pips for EUR/USD)
- 100-200 pip stop is standard for day trading gold
- 50-pip stops on gold get taken out by normal noise

Ethiopian considerations:
- Factor in potential connectivity issues when setting stops
- Consider wider stops if your internet connection is unreliable
- Always account for spreads widening during news events

Remember: A stopped-out trade is a good trade if you followed your plan. Protecting your capital is always the priority.

Risk-reward ratio (RRR) compares your potential profit to your potential risk on each trade. It is the second most important factor in trading after position sizing.

What Is Risk-Reward?
RRR = (Take Profit Distance) ÷ (Stop Loss Distance)

A trade with a 50-pip stop and 100-pip target has a 1:2 risk-reward ratio.
A trade with a 50-pip stop and 150-pip target has a 1:3 risk-reward ratio.

Why RRR Matters:
Even with a low win rate, a good RRR keeps you profitable:
- 40% win rate with 1:2 RRR = profitable (40% win × 2 = 0.8, 60% loss × 1 = 0.6, net +0.2)
- 30% win rate with 1:3 RRR = profitable (30% × 3 = 0.9, 70% × 1 = 0.7, net +0.2)
- 60% win rate with 1:1 RRR = barely profitable (60% × 1 = 0.6, 40% × 1 = 0.4, net +0.2)

Minimum RRR for Different Strategies:
- Day trading: minimum 1:2
- Swing trading: minimum 1:3
- News trading: minimum 1:2 (wider stops)
- Breakout trading: minimum 1:2

Setting RRR on Gold:
Gold's strong trends make 1:2 and 1:3 targets achievable. A 150-pip stop with a 300-450 pip target is realistic.

The RRR Trap:
Do not force an unrealistic RRR. If the market structure only supports a 1:1, either:
- Tighten your stop to achieve 1:2
- Skip the trade (best option)
- Scale in (take some profit at 1:1, let rest run)

Always calculate RRR before entry. If the ratio does not meet your minimum, do not take the trade.

Drawdown is the decline in your account from its peak. Managing drawdown is about survival — staying in the game long enough to become profitable.

Types of Drawdown:
1. Trade Drawdown — the maximum loss during a single open trade (floating loss)
2. Daily Drawdown — total loss in a single trading day
3. Peak-to-Trough Drawdown — loss from your account's all-time high to its current level

Acceptable Drawdown Limits:
- Per trade: 1-2% (hard stop loss)
- Per day: 3-5% (stop trading after hitting this)
- Per week: 6-10% (reduce size next week)
- Maximum account drawdown: 20% (stop trading entirely and review)

Drawdown Control Rules:

Rule 1: The 3-Strike Rule
After 3 consecutive losing trades, stop trading for the day. Your judgment is impaired even if you don't feel it.

Rule 2: The 2x Reduction Rule
If your account drops 10%, reduce position sizes by 50%. Trade micro lots instead of mini lots. Rebuild confidence with smaller risk.

Rule 3: The Reset Rule
After a 20% drawdown, stop trading for 2 weeks. Review every trade in your journal. Come back with a clear mind and smaller size.

Psychological Impact of Drawdown:
- 10% drawdown: manageable, slight increase in caution
- 20% drawdown: noticeable stress, urge to revenge trade
- 30% drawdown: significant emotional impact, poor decision making
- 40%+ drawdown: account likely unrecoverable without massive risk

Recovering from Drawdown:
To recover a 10% loss: need 11% gain (1.1x)
To recover a 20% loss: need 25% gain (1.25x)
To recover a 30% loss: need 43% gain (1.43x)
To recover a 50% loss: need 100% gain (2x)

The deeper the drawdown, the harder recovery becomes. This is why protecting your account from large drawdowns is more important than maximizing profits.

Max risk per trade is the absolute maximum dollar amount you are willing to lose on any single trade. It should never exceed 2% of your account.

Calculating Max Risk:
Account: $1,000
Max risk: 2% = $20
This means every trade must have a stop loss that limits loss to $20 or less.

Your max risk should NEVER change based on:
- How confident you feel
- How many winning trades you just had
- How much you want to make this month
- What someone on Telegram recommended

Your max risk may change based on:
- Account size growing (2% of $2,000 = $40, which is more in absolute terms)
- Market conditions (reduce to 1% during high volatility)
- News events (reduce to 0.5-1% during NFP/CPI)

Connecting to Position Sizing:
Max Risk ($20) ÷ Stop Loss (50 pips) ÷ Pip Value ($1) = Position Size (0.4 mini lots)

If your position size calculation gives a number below your broker's minimum lot size (e.g., 0.01 mini lots), your account is too small for that trade. Do not increase risk to meet the minimum — skip the trade.

The 1% vs 2% Debate:
Professional traders typically risk 0.5-1% per trade. Aggressive retail traders risk 2-3%. Beginners should start at 1% until they have 6 months of consistent profitability.

For Ethiopian traders: With smaller accounts ($200-500), 1% risk means $2-5 per trade. This is limiting but forces discipline. Trade micro lots and focus on preservation, not profit, in your first 6 months.

Emotional discipline is the ability to follow your trading plan regardless of fear, greed, or other emotions. It is the hardest skill to develop.

The Four Emotional Killers:

1. Fear of Missing Out (FOMO):
- You see a trade moving without you
- You enter late, near the top/bottom
- The trade immediately reverses
- Solution: If you missed the entry, let it go. There will be another trade.

2. Revenge Trading:
- You just lost money
- You want to "get it back" immediately
- You take a worse trade with larger size
- You lose even more
- Solution: After a loss, close the charts. Walk away for 30 minutes.

3. Greed:
- A trade is in profit but you want more
- You ignore your take profit target
- The trade reverses and hits breakeven or loss
- Solution: Take partial profits at your target. Let the rest run with a trailing stop.

4. Hope:
- A trade is going against you
- You refuse to accept the loss
- You move your stop loss further away
- The loss becomes catastrophic
- Solution: Your stop loss is non-negotiable. Never move it away from price.

Building Emotional Discipline:
1. Have a written trading plan — no exceptions
2. Pre-define everything: entry, stop, target, position size
3. Journal your emotions alongside your trades
4. After 3 consecutive losses, stop for the day
5. Focus on process, not profit — good process leads to profit over time

Mark Douglas (author of Trading in the Zone) said: "The market does not know you exist." Every trade is independent. Your last loss does not affect your next trade. Your last win does not affect your next trade. Trade each one as its own event.

Trading psychology is the study of how your mind affects your trading decisions. Master it, and your technical skills will shine.

The Two Systems of Thinking:

System 1 (Fast/Emotional):
- Operates automatically, with no effort
- Driven by instinct and emotion
- Good for: avoiding danger, reading social situations
- Bad for: making rational trading decisions

System 2 (Slow/Rational):
- Requires deliberate effort and focus
- Drives logical analysis
- Good for: calculating position sizes, analyzing structure
- Bad for: making split-second decisions

Every trading mistake happens when System 1 overrides System 2.

Common Psychological Biases in Trading:

1. Confirmation Bias:
You look for evidence that supports your trade idea and ignore evidence against it.
Solution: Force yourself to write down 3 reasons why the trade might fail before entering.

2. Recency Bias:
You give too much weight to recent events (recent wins make you overconfident, recent losses make you timid).
Solution: Review your last 30 trades before making any strategy changes.

3. Loss Aversion:
Losses feel 2-2.5x worse than equivalent gains feel good.
Solution: Accept that losses are part of trading. Focus on risk-to-reward, not win rate.

4. Anchoring:
You fixate on a specific price level (entry price, previous high) and refuse to accept movement away from it.
Solution: Once a trade is open, the entry price no longer matters. Focus on current structure.

The Mental Game for Ethiopian Traders:
- Limited deposit options make losses feel heavier (planned deposits reduce this stress)
- Local inflation makes trading profits feel urgent (ignore this — trade the plan)
- Comparing yourself to others on Telegram/WhatsApp groups (don't — everyone shows wins, hides losses)

Your mindset determines your trading results more than your strategy. A simple strategy executed with discipline beats a complex strategy executed emotionally.

A trading routine is a set of habits you perform consistently before, during, and after each trading session. It removes emotion from your decisions.

Building Your Pre-Trading Routine (15 minutes before London open):

1. Check Higher Timeframes (2 min):
- Look at daily chart: identify trend and key levels
- Look at 4-hour chart: confirm trend, mark order blocks
- Are we in an uptrend, downtrend, or range?

2. Analyze Lower Timeframes (3 min):
- 1-hour: identify recent structure
- 15-min: find potential entry levels
- Mark support, resistance, and liquidity zones

3. Fundamental Check (2 min):
- What news events are scheduled today?
- Any high-impact releases?
- Should I reduce position sizes?

4. Set Your Levels (3 min):
- Draw key support/resistance levels
- Mark Asian Range (high and low)
- Identify order blocks near current price

5. Prepare Mentally (5 min):
- Review your trading plan
- Remind yourself of your rules (2% risk, 1:2 minimum RRR)
- Visualize following the plan perfectly
- Accept that you may not trade today if no setup appears

During-Trading Routine:
- Check levels every 30 minutes
- Do not check P&L constantly (set alerts instead)
- If you take a trade: position size first, then entry
- Log the trade immediately

Post-Trading Routine (5 minutes after session close):
- Review any trades taken
- Did you follow the plan?
- Journal emotions and lessons
- Close charts and do not reopen until next session

Sunday Weekly Review (30 minutes):
- Review all trades from the week
- Calculate win rate, average RRR, total P&L
- Identify patterns in your best and worst trades
- Plan the week ahead (news events, market outlook)

Consistency is the goal. A routine turns trading from an emotional gamble into a professional process.

Trading is a skill that requires continuous improvement. The best traders in the world never stop learning and refining their approach.

The Improvement Framework:

1. Track Everything:
- Every trade goes in your journal
- Every journal entry is reviewed weekly
- Look for patterns: your best setups, worst times, emotional triggers

2. Review Your Metrics:
- Win rate: does your strategy need adjustment?
- Average RRR: are you letting winners run?
- Largest drawdown: is risk management adequate?
- Number of trades: are you overtrading?

3. Identify Weaknesses:
- Technical analysis: study more on specific patterns
- Psychology: work on discipline and emotional control
- Risk management: tighten position sizing rules
- Execution: improve entry timing and stop placement

4. Targeted Practice:
- Spend 2 hours weekly on chart time (no trading, just marking levels)
- Backtest 50 historical trades of your primary setup
- Demo trade if you are on a losing streak
- Read one trading book per month (recommended: Trading in the Zone, Technical Analysis of Financial Markets, The Disciplined Trader)

5. Adjust and Iterate:
- Make one small change at a time (too many changes at once = chaos)
- Test the change for 20 trades before evaluating
- Keep what works, discard what does not
- Your strategy should evolve as you grow

The Plateau:
Every trader hits a plateau where progress seems to stop. This is normal. Push through it by:
- Focusing on process over results
- Reducing size temporarily to remove pressure
- Learning a new analytical technique
- Taking a 3-5 day break from charts

The goal is not perfection — it is consistent improvement. A 1% improvement each week compounds to 67% improvement in a year.

This final review lesson consolidates everything from this course into a practical system.

Your Risk Management System:

Before Every Trade:
1. Check higher timeframe trend (daily/4H)
2. Identify entry level and stop loss distance
3. Calculate: Position Size = (Account × 2%) ÷ (Stop Pips × Pip Value)
4. Confirm minimum 1:2 risk-reward ratio
5. Journal entry details before clicking buy/sell

During the Trade:
6. Set stop loss at entry — never widen it
7. Move to breakeven once price reaches 1:1
8. Take 30-50% profit at TP1
9. Let remainder run with trailing stop
10. Do not check P&L every 5 minutes

After the Trade:
11. Journal the outcome (profit or loss)
12. Rate your discipline (1-10, did you follow the plan?)
13. One lesson learned
14. Close the chart — next trade is an independent event

Daily Limits:
- Max trades: 3 per day (quality over quantity)
- Max loss: 5% per day (hard stop)
- After 3 losses: stop trading for the day
- After 10% drawdown: halve position sizes
- After 20% drawdown: 2-week break

Weekly Review Checklist:
- Total trades: ___
- Win rate: ___%
- Average RRR: ___ 
- Total P&L: $___ (___%)
- Discipline score (1-10): ___
- Setup that worked best: ___
- Biggest mistake: ___
- Focus for next week: ___

The Complete Trader Formula:
(Good Strategy + Proper Risk Management + Emotional Discipline) × Consistency = Profitability

Risk management is not a part of trading. It IS trading. Everything else supports it.`,
  ],
  'market-structure': [
    `Market structure is the framework that professional traders use to analyze any market. It is the foundation upon which all other analysis is built.

The Core Concept

Financial markets move in waves. These waves create a structure of highs and lows that reveals whether buyers or sellers are in control.

The theory is simple but powerful: price movements are not random. They follow patterns of institutional order flow that create identifiable structure.

Trends and Structure

Uptrend (Bullish Structure):
- Consecutive higher highs (HH) and higher lows (HL)
- Each pullback stays above the previous low
- Each rally exceeds the previous high
- Buyers are in control

Downtrend (Bearish Structure):
- Consecutive lower highs (LH) and lower lows (LL)
- Each bounce stays below the previous high
- Each decline exceeds the previous low
- Sellers are in control

Sideways (Range Structure):
- Highs and lows are roughly equal
- No clear directional bias
- Price oscillates between support and resistance

The Importance of Higher Timeframes

Structure on higher timeframes (daily, 4-hour) overrides structure on lower timeframes (15-min, 5-min).

Always determine the daily structure first, then the 4-hour structure, then the 1-hour. Trade in the direction of the higher timeframe trend.

Market Structure in Gold

Gold excels at forming clean market structure because:
- High liquidity means institutional footprints are clear
- 24-hour trading creates continuous structure
- Less news-driven noise than forex pairs
- Central bank and institutional participation creates persistent trends

Identifying Structure Changes

A trend changes when:
- In an uptrend: price breaks below a previous Higher Low
- In a downtrend: price breaks above a previous Lower High

This is called a "Change of Character" (CHoCH) — the market telling you the trend may be reversing.

Structure is the lens through which professional traders view all markets. Master this before any other analysis technique. In the next lesson, we will dive into HH/HL analysis in detail.`,
    `HH/HL (Higher High / Higher Low) analysis is the most reliable method for identifying and trading trends.

The HH/HL Framework

Every bar on your chart can be classified as either:
- A higher high (HH) — a swing high above the previous swing high
- A lower high (LH) — a swing high below the previous swing high
- A higher low (HL) — a swing low above the previous swing low
- A lower low (LL) — a swing low below the previous swing low

Identifying Swing Points

A swing high is a candle with lower highs on both sides. A swing low is a candle with higher lows on both sides.

To identify them:
1. Look for a candle that is clearly higher than its neighbors
2. Confirm the next candle(s) are lower (for swing high) or higher (for swing low)
3. Mark the level on your chart
4. Connect the swings to see the structure

Reading HH/HL Sequences

HH + HL = Strong uptrend (buy on pullbacks)
HH + LH = Uptrend weakening (potential reversal)
LH + HL = Downtrend weakening (potential reversal)
LH + LL = Strong downtrend (sell on bounces)

Practical Example

On the XAUUSD 1-hour chart:
- Price makes a low at 1950.00 (swing low)
- Rallies to 1970.00 (swing high)
- Pulls back to 1955.00 (higher low — above 1950)
- Rallies to 1990.00 (higher high — above 1970)
- Pulls back to 1975.00 (higher low — above 1955)

This is a textbook uptrend: HH + HL + HH + HL
You should be looking for long entries on each pullback.

The Trend Line Connection

Connect the higher lows to form an ascending trend line in uptrends.
Connect the lower highs to form a descending trend line in downtrends.

When price breaks the trend line, it signals a potential structure change.

Common Mistakes

- Labeling swings before they are confirmed (wait for the next candle)
- Using too low a timeframe (avoid 1-min and 5-min for structure)
- Forcing HH/HL analysis in a ranging market
- Ignoring the trend on higher timeframes

Practice: Every day for two weeks, spend 10 minutes labeling HH/HL on the XAUUSD 1-hour chart. This simple exercise will transform how you read markets.

Break of Structure (BOS) occurs when price breaks through a key swing point, signaling that the current trend is continuing with momentum.

What Is Break of Structure:
In an uptrend, a BOS happens when price breaks above the previous swing high.
In a downtrend, a BOS happens when price breaks below the previous swing low.

BOS vs False Breakout:
A genuine BOS:
- Closes beyond the swing point (not just a spike)
- Has momentum (strong candles, no long wicks)
- Retests and holds the broken level as support/resistance
- Confirmed by structure on the next timeframe up

A false breakout:
- Opens above resistance but closes back inside
- Has a long wick at the level
- Immediately reverses into the range
- Often a liquidity grab by institutions

Trading BOS on Gold:
1. Mark the most recent swing high/low
2. Wait for price to break the level with a strong candle
3. Watch for a retest of the broken level
4. Enter on the retest with confirmation
5. Stop loss beyond the breakout level
6. Target the next swing point

BOS is the most reliable signal for trend continuation. When combined with volume and momentum, it signals strong institutional participation.

Change of Character (CHoCH) is the first sign that a trend may be ending. It occurs when the current trend structure is violated.

In an uptrend: price breaks below the most recent Higher Low (HL)
In a downtrend: price breaks above the most recent Lower High (LH)

CHoCH does not necessarily mean the trend has reversed — it means the trend is weakening. The market is telling you that momentum is shifting.

CHoCH vs BOS:
- BOS = trend continuing (buy/sell signal)
- CHoCH = trend weakening (close or reduce positions, prepare for reversal)

Three Stages of a Trend Reversal:
1. First CHoCH: trend structure violated (reduce positions)
2. Second CHoCH: new trend structure forming (consider counter-trend entry)
3. Confirmed reversal: new HH/HL sequence in opposite direction (full commitment)

Trading CHoCH on Gold:
1. Identify the current trend (HH/HL sequence)
2. Watch for the first CHoCH (structure break)
3. Do NOT enter counter-trend yet — wait for confirmation
4. Reduce any existing positions in the old trend direction
5. Mark key levels for a potential reversal entry
6. Only enter after the second CHoCH or a clear retest

Gold's CHoCH Patterns:
Gold tends to form clear CHoCH signals because of institutional participation. A CHoCH on the 1-hour gold chart is a strong signal to pay attention.

Patience is key. CHoCH warns you to be ready — it does not tell you to act immediately. Wait for confirmation before entering counter-trend.

Supply and demand is the foundation of all market movements. Price moves because of imbalances between buyers and sellers.

The Core Concept:
When there are more buyers than sellers, price rises (demand exceeds supply).
When there are more sellers than buyers, price falls (supply exceeds demand).

Supply Zones:
Price levels where selling pressure exceeds buying pressure. Institutions have placed sell orders here. Price tends to fall from these zones.

Demand Zones:
Price levels where buying pressure exceeds selling pressure. Institutions have placed buy orders here. Price tends to rise from these zones.

Supply and Demand vs Support/Resistance:
- S/R is horizontal levels where price previously reversed
- S/D zones are areas where institutions have placed orders
- S/D zones have width (not exact lines)
- S/D zones are based on order flow, not just price history

Identifying Supply/Demand Zones:
1. Look for a strong impulsive move (not a drift)
2. Find the consolidation before the impulsive move
3. The base of the consolidation is the supply/demand zone
4. Fresh zones (never retested) are strongest

Fresh vs Tested Zones:
- Fresh zone: price has NOT returned since the impulsive move — strongest
- Tested once: price has returned once — still valid but weaker
- Tested multiple times: zone is losing significance — look for a new one

On gold, supply and demand zones on the 1-hour chart typically last 1-3 days before being broken or losing significance.

Supply zones are specific price areas where institutional selling overwhelms buying, causing price to drop.

Characteristics of Strong Supply Zones:
1. Formed by a sharp sell-off (not gradual decline)
2. Preceded by a consolidation or range
3. Zone has clear boundaries (usually 10-20 pips wide on 1-hour)
4. Little to no overlap with the subsequent sell-off
5. Higher timeframe supply is stronger than lower timeframe

Supply Zone Trading Strategy:

Entry: Wait for price to return to the supply zone
Look for: Bearish reversal candlestick (shooting star, bearish engulfing, pin bar)
Entry type: Limit sell order at the lower boundary of the zone, or market sell on confirmation
Stop loss: Above the supply zone (10-20 pips extra for gold)
Target: Move to the nearest demand zone or support level

Gold Supply Zone Example:
- Supply zone identified at 1985-1990 on 1-hour gold
- Price rallies to 1988, forms a bearish engulfing candle
- Entry: sell at 1988
- Stop: 2005 (above the zone)
- Target 1: 1960 (nearest support)
- Target 2: 1940 (next demand zone)

Multiple Timeframe Supply:
Check supply zones on the daily and 4-hour charts. A supply zone that aligns across multiple timeframes is much stronger. If you see a 1-hour supply zone that is also aligned with a daily resistance level, the probability of a reversal is significantly higher.

Supply zones are most effective when fresh. Once price retests and leaves a zone, the zone weakens. Each retest reduces its effectiveness.

Demand zones are the mirror image of supply zones — price areas where institutional buying overwhelms selling, causing price to rise.

Characteristics of Strong Demand Zones:
1. Formed by a sharp rally (not gradual rise)
2. Preceded by a consolidation or range
3. Zone has clear boundaries (10-20 pips wide on 1-hour)
4. Little to no overlap with the subsequent rally
5. Higher timeframe demand is stronger

Demand Zone Trading Strategy:

Entry: Wait for price to return to the demand zone
Look for: Bullish reversal candlestick (hammer, bullish engulfing, pin bar)
Entry type: Limit buy order at the upper boundary, or market buy on confirmation
Stop loss: Below the demand zone (10-20 pips extra for gold)
Target: Move to the nearest supply zone or resistance level

Gold Demand Zone Example:
- Demand zone identified at 1920-1925 on 1-hour gold
- Price drops to 1922, forms a hammer candle
- Entry: buy at 1923
- Stop: 1905 (below the zone)
- Target 1: 1950 (nearest resistance)
- Target 2: 1975 (next supply zone)

Demand Zones on Different Timeframes:
- Daily: zones last weeks to months (for position trading)
- 4-hour: zones last days to weeks (for swing trading)
- 1-hour: zones last hours to days (for day trading)
- 15-min: zones last minutes to hours (for scalping)

The strongest demand zones are those that align across multiple timeframes. A 1-hour demand zone overlapping with a 4-hour demand zone is a high-probability entry.

Order flow is the study of volume and price action to determine whether buyers or sellers are in control at any moment.

What Order Flow Reveals:
- Who is driving the current move (institutions or retail)
- Whether the move is likely to continue or reverse
- Where hidden support and resistance exist
- When to expect acceleration or exhaustion

Reading Order Flow on Price Action:
- Strong momentum candles with small wicks = aggressive buying/selling (institutional)
- Choppy, overlapping candles = uncertainty (retail-driven)
- Wide-range candles at key levels = order flow concentration
- Narrow-range candles = order flow balancing (consolidation)

Volume and Order Flow:
On most forex brokers, true volume is not available (forex is OTC). Use tick volume instead — the number of price changes in a period.

Increasing tick volume + strong price move = genuine order flow (trend will continue)
Decreasing tick volume + strong price move = exhaustion (trend may reverse)

Order Flow Imbalance:
When price moves from one level to another, the distance and speed of the move indicates the imbalance between buyers and sellers.

- Fast, straight move (no retracement) = strong imbalance, one side is dominant
- Gradual move with many retracements = balanced, trend is weak
- Sharp spike then immediate reversal = liquidity grab (false move)

On gold, order flow is clearest during the London-NY overlap. The 1-hour chart shows the most reliable order flow patterns. Use 15-min for entry timing after confirming order flow direction.

Trend identification determines which direction to trade. Trading against the trend is the most common mistake beginners make.

The Three Timelines:
1. Long-term trend (daily chart): Your trading bias
2. Medium-term trend (4-hour chart): Your strategy filter
3. Short-term trend (1-hour chart): Your entry timing

Golden Rule: Trade in the direction of the daily trend. Find entries on the 4-hour. Execute on the 1-hour.

Identifying Uptrend:
- Daily: consecutive HH and HL
- 4-hour: price above 50 EMA
- 1-hour: pullbacks hold above previous lows
- Strategy: only look for long entries

Identifying Downtrend:
- Daily: consecutive LH and LL
- 4-hour: price below 50 EMA
- 1-hour: bounces stay below previous highs
- Strategy: only look for short entries

Identifying Range:
- Daily: alternating HH/LH and HL/LL
- 4-hour: price oscillating around 50 EMA
- 1-hour: equal highs and lows
- Strategy: buy at range support, sell at range resistance

Trend Strength Indicators:
- ADX > 25: strong trend (trade with momentum)
- ADX 15-25: developing trend (look for breakouts)
- ADX < 15: no trend (range-bound strategies)

Moving Averages for Trend:
- 20 EMA (1-hour): short-term trend filter
- 50 EMA (4-hour): medium-term trend filter
- 200 EMA (daily): long-term trend filter

Price above all three = strong uptrend
Price below all three = strong downtrend
Price mixed between them = ranging market

For gold: Gold trends are persistent. Check the daily trend once per week and do not change your bias unless a clear CHoCH occurs.

Range-bound markets occur when price oscillates between two horizontal levels without establishing a trend. They require a different approach than trending markets.

Identifying a Range:
- Price bounces between identifiable support and resistance levels
- No HH/HL or LH/LL sequence
- ADX consistently below 20
- 50 EMA flattens horizontally

Range Trading Strategy:

Buy at Range Support:
- Price reaches the support level
- Look for a bullish reversal candle (hammer, bullish engulfing)
- Entry: market buy on confirmation
- Stop loss: 10-20 pips below support
- Target: range resistance (typically 1:2 or better RRR)

Sell at Range Resistance:
- Price reaches the resistance level
- Look for a bearish reversal candle (shooting star, bearish engulfing)
- Entry: market sell on confirmation
- Stop loss: 10-20 pips above resistance
- Target: range support

When the Range Breaks:
A range breakout in the direction of the higher timeframe trend is a strong trading signal.

Bullish breakout: price closes above resistance
- Entry: on retest of the broken resistance (now support)
- Target: range height projected from breakout level
- If daily trend is up, this is a high-probability trade

Bearish breakout: price closes below support
- Entry: on retest of the broken support (now resistance)
- Target: range height projected from breakout level
- If daily trend is down, this is a high-probability trade

Gold in Ranges:
Gold ranges are typically 500-2000 pips wide and last 2-5 days. After a range, gold often makes a strong breakout in the direction of the higher timeframe trend.

Do not trade ranges when a high-impact news event is expected. Ranges can break violently during news and catch range traders on the wrong side.

Entry triggers are the specific conditions that must be met before you enter a trade. They transform analysis into execution.

The Entry Checklist:
Before entering any trade, confirm these conditions:

1. Trend Alignment:
- Daily trend supports this direction
- 4-hour trend supports this direction
- I am trading with the higher timeframe trend

2. Structure Confirmation:
- Clear market structure supports entry
- Key level identified (supply/demand, order block, liquidity zone)
- Stop loss has a technical level (not arbitrary)

3. Entry Signal:
- Bullish/bearish reversal candle at the level
- Retest of a broken structure level
- Momentum confirmation (strong candle after the signal)

4. Risk Management:
- Risk is within 1-2% of account
- Minimum 1:2 risk-reward ratio
- Position size calculated

5. Emotional Check:
- I am not trading out of boredom or revenge
- I have not had 3 consecutive losses today
- I am calm and focused

If any of these conditions are not met, skip the trade. There is always another trade tomorrow.

Gold Entry Examples:

Trend-Following Entry:
- Daily trend: up
- 4-hour: pullback to 50 EMA
- 1-hour: bullish order block at the pullback low
- Entry: buy on bullish engulfing candle at the order block
- Result: high-probability entry with all conditions aligned

Counter-Trend Entry (Rare):
- Daily trend: up
- 4-hour: double top forming at daily resistance
- 1-hour: bearish CHoCH
- Entry: sell on bearish candle at resistance
- Risk: counter-trend, smaller position size, tighter stop
- Result: only take this if confluence is exceptional

The best entries are boring — price reaches a level, forms a signal candle, and you execute. No chasing, no FOMO. Just process.

Stop placement in structure is about positioning your stop loss at a level that invalidates your trade thesis, not at an arbitrary distance.

The Principle:
A stop loss should be placed where the market proves you wrong — not where you feel comfortable.

Correct Stop Placement:

For Long Trades:
- Below the most recent swing low (structure-based)
- Below the demand zone or order block
- Below the range support (in a range)
- Below the broken resistance (now support) on a retest

For Short Trades:
- Above the most recent swing high (structure-based)
- Above the supply zone or order block
- Above the range resistance (in a range)
- Above the broken support (now resistance) on a retest

Stop Width Examples on Gold:

Structure Stop (Recommended):
- Day trade gold: 100-200 pips below the swing low
- Swing trade gold: 300-500 pips below the swing low
- Stop width determined by structure, not a fixed number

Volatility Stop:
- Use 1.5x ATR (Average True Range of 14 periods on 1-hour chart)
- If ATR is 150 pips, your stop is 225 pips
- Automatically adjusts for current volatility

Fixed Stop (Beginner):
- Day trade gold: 150 pips
- Swing trade gold: 350 pips
- Simpler but less effective than structure-based stops

Stop Distance and Position Sizing:
Wider stop = smaller position size (same dollar risk)
Narrower stop = larger position size (same dollar risk)

Never set a stop arbitrarily tight to fit a larger position size. Always let market structure determine your stop distance, then size the position accordingly.

Gold stops need room to breathe. A 50-pip stop on gold will get hit by normal market noise. Use structure-based stops at least 100 pips away from your entry for day trades.

Multi-timeframe analysis (MTF) is the practice of examining a market across multiple timeframes to get a complete picture of price action.

The Three Timeframe Method:

Timeframe 1: Higher Trend (Daily or 4H)
- Determines your overall bias
- Check once per day
- Do not change bias without a clear CHoCH on this timeframe

Timeframe 2: Execution (1-hour)
- Where you identify your setup
- Find structure, supply/demand, order blocks
- Wait for your entry signal

Timeframe 3: Entry (15-min or 5-min)
- Fine-tune your entry
- Identify the exact candle for entry
- Set precise stop and target

Applying MTF to Gold:

Step 1: Check Daily Chart
- What is the overall structure? (uptrend/downtrend/range)
- Where are the daily supply/demand zones?
- What is the 200 EMA doing? (slope and position)

Step 2: Check 4-Hour Chart
- Is price in a pullback or continuation?
- Where are the 4-hour order blocks?
- What is the 50 EMA doing?

Step 3: Check 1-Hour Chart
- Where is the current structure pointing?
- Are there reversal signals at key levels?
- Is there a clear entry trigger?

Step 4: Check 15-Min Chart
- What is the exact candle pattern at the entry level?
- Is there momentum confirmation?
- When should I execute?

MTF Alignment Example:
- Daily: uptrend (HH/HL sequence)
- 4-hour: pullback to demand zone
- 1-hour: bullish order block formed at demand zone
- 15-min: bullish engulfing candle at the order block
- Action: BUY - all timeframes align

If timeframes conflict, defer to the higher timeframe. If daily is up but 1-hour is trending down, the 1-hour downtrend is likely a pullback. Look for long entries at the end of the pullback.

A structure trading plan is a written document that defines exactly when and how you enter trades based on market structure.

Your Structure Trading Rules:

Rule 1: Identify the Daily Trend
- If daily is uptrend: only take long trades
- If daily is downtrend: only take short trades
- If daily is range: trade both directions at range boundaries

Rule 2: Find Your Setup on 4-Hour
- In an uptrend: wait for a pullback to a demand zone or order block
- In a downtrend: wait for a bounce to a supply zone or order block
- In a range: wait for price to reach range boundaries

Rule 3: Confirm on 1-Hour
- Is the structure still intact?
- Is there a reversal candle at your level?
- Is your stop level clear and technical?

Rule 4: Execute
- Calculate position size (2% risk)
- Set stop loss at the technical level
- Set take profit at 1:2 or 1:3 RRR
- Enter on confirmation (not anticipation)

Rule 5: Manage
- Move stop to breakeven at 1:1
- Take partial profit at TP1
- Trail stop for the rest
- Log the trade

Sample Entry Journal Entry:

Date: 2026-06-08
Instrument: XAUUSD
Direction: Long
Daily trend: Up ✓
4H setup: Pullback to demand zone at 1930-1935 ✓
1H confirmation: Bullish order block at 1932 ✓
15-min trigger: Bullish engulfing at 1933 ✓
Entry: 1934
Stop: 1920 (14 pip below demand zone)
Target 1: 1960 (2.6:1 RRR)
Target 2: 1980 (3.3:1 RRR)
Size: 0.2 mini lots
Risk: $28 (1.4%)

A plan removes emotions. When every condition is written down, you do not need to decide during the trade — you already decided before.

This final review lesson consolidates the entire Advanced Market Structure course into a practical system you can use every day.

The Complete Structure Trading System:

Daily Routine:
1. Mark structure on daily chart (5 min)
2. Identify HTF bias (uptrend/downtrend/range)
3. Mark 4-hour supply/demand zones
4. Note any overnight structure changes
5. Set alerts at key levels

Pre-Trade Checklist:
- [ ] Daily trend supports this direction
- [ ] 4-hour setup is clear
- [ ] 1-hour structure confirms the setup
- [ ] Entry trigger is present (reversal candle)
- [ ] Stop level is technical, not arbitrary
- [ ] RRR is minimum 1:2
- [ ] Position size is within 2% risk
- [ ] No emotional urgency (calm, focused)

If all 8 boxes are checked → enter the trade.
If any box is unchecked → do not enter. Review. Wait.

Trade Management Rules:
1. Set stop at entry — never widen
2. Move to breakeven at 1:1 RRR
3. Take 50% profit at TP1
4. Trail remaining 50% with 50-pip trailing stop on 15-min chart
5. If stopped at breakeven, the trade was a scratch — no harm done

Review Routine:
After each trade: rate your discipline 1-10 in your journal
After each day: count your trades (max 3)
After each week: calculate win rate, average RRR, total P&L
After each month: review all trades, identify patterns, adjust strategy

The Structure Trader's Mindset:
- Price moves in waves — ride the wave, do not fight it
- Structure tells you the story — learn to read it
- Institutions leave footprints — follow them
- Patience is a position — waiting for the right setup is a valid trade
- Discipline beats prediction — follow the plan, not your feelings

You now have a complete market structure system. Apply it consistently. Master it. Your trading will never be the same.`,
  ],
  'bootcamp': [
    `Welcome to the FundedBirr Academy Full Trading Bootcamp. This is an intensive program designed to transform you from a beginner into a competent trader over 36 structured lessons.

What to Expect:
- Comprehensive review of every concept from the previous courses
- Practical application through live market analysis sessions
- Mock trading sessions to practice without financial risk
- Individual and group mentorship
- Performance evaluation and strategy improvement

Bootcamp Structure:
- Weeks 1-2: Foundations review (lessons 1-8)
- Weeks 3-4: Advanced concepts (lessons 9-16)
- Weeks 5-6: Practical application (lessons 17-24)
- Weeks 7-8: Mentorship and graduation (lessons 25-36)

Prerequisites:
Before starting this bootcamp, you should have completed or be familiar with:
- Introduction to Forex
- Introduction to Gold
- Candlestick Charts
- Forex Fundamentals
- Gold Trading Mastery
- Risk Management & Psychology
- Advanced Market Structure

Requirements for Certification:
- Complete all 36 lessons
- Pass the final exam (80% or higher)
- Demonstrate consistent application of risk management
- Complete the trading journal requirements

The bootcamp runs from July 1 to August 31, 2026. Live mentorship sessions are held weekly. Recordings will be available for all sessions.

Let's begin this journey. The next 36 lessons will be the most important of your trading education.`,
    `This lesson refreshes the essential forex concepts you need for the bootcamp.

Currency Pairs Review:
- Majors: EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD
- Crosses (Minors): EUR/GBP, EUR/JPY, GBP/JPY
- Gold: XAU/USD (most important for this bootcamp)

Pips and Lots Refresher:
- 1 pip = 0.0001 for most pairs (0.01 for JPY pairs)
- Standard lot = 100,000 units ($10/pip for EUR/USD)
- Mini lot = 10,000 units ($1/pip)
- Micro lot = 1,000 units ($0.10/pip)

Key Concepts You Must Know:
1. Spread: the cost of trading (bid-ask difference)
2. Leverage: amplifies both profits and losses
3. Margin: the collateral required to open positions
4. Margin call: when equity falls below required margin

Trading Sessions (EAT = GMT+3):
- Asian: 03:00-12:00 EAT (low volatility)
- London: 10:00-19:00 EAT (high volatility)
- New York: 15:00-00:00 EAT (highest volatility)
- Best window for Ethiopian traders: 16:00-20:00 EAT (London-NY overlap)

If any of these concepts are unclear, review the "What is Forex?" course before proceeding. You need this foundation solid before the advanced content.`,
    `Gold fundamentals are essential for this bootcamp. Most of our analysis will focus on XAUUSD.

Why Gold Is the Primary Instrument for This Bootcamp:
- Clear technical patterns (strong trends, clean structure)
- High liquidity during Ethiopian trading hours
- Ethiopian traders' preferred instrument
- Lower spreads than exotic pairs
- High volatility = more trading opportunities

Gold Price Drivers:
1. USD Strength (DXY inverse correlation)
2. Real interest rates (inverse correlation)
3. Inflation (positive correlation)
4. Geopolitical events (positive correlation)
5. Central bank gold reserves

Gold Trading Hours:
- Gold is most active during London and New York sessions
- Asian session gold typically ranges (great for Asian range strategy)
- News releases (NFP, CPI, Fed) cause the biggest gold moves

Gold Pip Structure:
- 1 standard lot = 100 oz
- 1 pip movement = $10 per standard lot
- Gold moves 1000-3000 pips daily (intraday $10-30 range)
- Recommended stop: 100-200 pips for day trading

Throughout this bootcamp, gold will be our primary market. Master these fundamentals before moving on.`,
    `Technical analysis is the study of price charts to forecast future movements. This bootcamp uses a primarily technical approach.

The Technical Analysis Toolkit:

1. Market Structure (Most Important):
- Higher Highs (HH), Higher Lows (HL) = uptrend
- Lower Highs (LH), Lower Lows (LL) = downtrend
- Break of Structure (BOS) = trend continuation
- Change of Character (CHoCH) = trend weakening

2. Support and Resistance:
- Horizontal levels where price has reversed before
- Round numbers are significant (1950, 2000, etc.)
- Old resistance becomes new support (and vice versa)
- The more times a level is tested, the weaker it becomes

3. Candlestick Patterns:
- Reversal patterns: hammer, engulfing, pin bar, doji
- Continuation patterns: bullish/bearish flags
- Confirmation: wait for the next candle to confirm

4. Trend Lines:
- Connect swing highs (downtrend) or swing lows (uptrend)
- 2 points to draw, 3 points to confirm
- Break of trend line = potential trend change

5. Moving Averages:
- 20 EMA: short-term trend
- 50 EMA: medium-term trend
- 200 EMA: long-term trend
- EMA slope indicates trend direction and strength

In this bootcamp, you will apply all these tools together, not in isolation. The real skill is combining them into a cohesive analysis.`,
    `Candlestick mastery is essential for precise entry and exit timing. Review the key patterns you must know.

Single Candle Reversal Patterns:

Hammer:
- Small body at the top, long lower wick
- Appears at the bottom of a downtrend
- Signal: bullish reversal
- Confirmation: next candle closes higher

Shooting Star:
- Small body at the bottom, long upper wick
- Appears at the top of an uptrend
- Signal: bearish reversal
- Confirmation: next candle closes lower

Doji:
- Open and close are nearly equal
- Market indecision
- At support = potential bullish reversal
- At resistance = potential bearish reversal

Two-Candle Reversal Patterns:

Bullish Engulfing:
- Bearish candle followed by larger bullish candle
- Bullish candle completely "engulfs" the previous body
- Strong reversal signal at support

Bearish Engulfing:
- Bullish candle followed by larger bearish candle
- Bearish candle completely "engulfs" the previous body
- Strong reversal signal at resistance

Candlestick Confirmation Rules:
1. Pattern must appear at a key level (S/R, order block, supply/demand)
2. Next candle must confirm the direction
3. Higher timeframe must support the reversal
4. Do not trade every pattern — only those with confluence

Gold candlestick patterns are most reliable on the 1-hour and above. Lower timeframes produce too many false signals.`,
    `Market structure is the most reliable form of analysis. This deep dive ensures you can identify and trade structure in any market condition.

Structure Review:

Uptrend Structure:
- HH + HL = strong uptrend
- HH + LH = uptrend weakening (trend line break possible)
- Entry strategy: buy at Higher Lows (HL)
- Stop: below the HL

Downtrend Structure:
- LH + LL = strong downtrend
- LH + HL = downtrend weakening
- Entry strategy: sell at Lower Highs (LH)
- Stop: above the LH

Structure Hierarchy:
- Daily structure > 4-hour structure > 1-hour structure > 15-min structure
- Always trade in the direction of the higher timeframe
- Use the lower timeframe for precise entry timing

Structure-Based Entries:

In an uptrend, wait for:
1. A pullback to a Higher Low
2. A bullish reversal candle at the HL
3. Entry on confirmation
4. Stop below the HL

In a downtrend, wait for:
1. A bounce to a Lower High
2. A bearish reversal candle at the LH
3. Entry on confirmation
4. Stop above the LH

Practice Exercise:
Take a blank chart of XAUUSD 1-hour. Mark every HH, HL, LH, LL for the last 100 candles. Do this every day for one week. By day 7, you will see structure clearly without thinking about it.`,
    `Supply and demand is the institutional approach to support and resistance. This is how professional traders view the market.

Supply Zones:
- Areas where institutions have placed sell orders
- Price tends to fall from these zones
- Identified by a sharp sell-off after consolidation
- Fresh zones (not previously retested) are strongest

Demand Zones:
- Areas where institutions have placed buy orders
- Price tends to rise from these zones
- Identified by a sharp rally after consolidation
- Fresh zones are strongest

Supply/Demand vs Support/Resistance:

Support/Resistance:
- Based on WHERE price reversed
- Single horizontal line
- Retail approach

Supply/Demand:
- Based on WHERE institutions placed orders
- A zone with width
- Institutional approach

Trading Supply/Demand on Gold:

Step 1: Identify the zone on 1-hour or 4-hour chart
Step 2: Wait for price to return to the zone
Step 3: Look for a reversal candle at the zone boundary
Step 4: Enter on confirmation
Step 5: Stop loss beyond the zone (give 10-20 pips buffer)

Supply/Demand Alignment:
When a 1-hour demand zone aligns with a 4-hour demand zone, the setup is very strong. When supply/demand also aligns with market structure, you have maximum confluence.

Exercise: For one week, mark the current supply and demand zones on XAUUSD 1-hour every morning. Note how price reacts when it reaches these zones. Track your accuracy.`,
    `Order blocks and liquidity are advanced concepts that separate professional traders from retail traders.

Order Blocks (OB):
A specific candle where institutions have placed large pending orders.

Bullish OB: The last bearish candle before a strong rally
- Institutions placed buy orders at this level
- When price returns to this candle's range, it tends to bounce

Bearish OB: The last bullish candle before a strong sell-off
- Institutions placed sell orders at this level
- When price returns to this candle's range, it tends to reverse

Liquidity Zones:
Areas where retail stop losses are concentrated.

Buy-Side Liquidity: Stop losses above swing highs
Sell-Side Liquidity: Stop losses below swing lows

Liquidity Grab:
1. Price approaches a swing high/low
2. Spikes 5-15 pips beyond it (triggering stops)
3. Immediately reverses in the opposite direction
4. Institutions used the liquidity to fill their orders

Combining Order Blocks and Liquidity:
The most powerful trades occur when:
- An order block exists near a liquidity zone
- Price sweeps the liquidity (liquidity grab)
- Price reverses at the order block
- This is a high-probability entry

On gold, liquidity grabs are common during London and New York session opens. These are often the best entries of the day.`,
    `The DXY (US Dollar Index) has the strongest external correlation with gold. Mastering this relationship improves your gold trading significantly.

DXY Components:
- EUR: 57.6% (dominant)
- JPY: 13.6%
- GBP: 11.9%
- CAD: 9.1%
- SEK: 4.2%
- CHF: 4.2%

Gold-DXY Correlation:
- Primary: inverse correlation (-0.7 to -0.9)
- When DXY rises, gold typically falls
- When DXY falls, gold typically rises

How to Use DXY in Your Trading:

1. DXY Confirms Gold Direction:
If gold is breaking resistance and DXY is breaking support, the gold move is validated.
If gold is breaking resistance but DXY is also rising, the gold move may be false.

2. DXY Divergence:
Gold falls but DXY is flat → gold may be forming a bottom
Gold rises but DXY is flat → gold may be topping

3. DXY Breakouts Predict Gold Moves:
DXY breaks resistance → gold likely to break support within 5-15 minutes
DXY breaks support → gold likely to break resistance within 5-15 minutes

Practical Setup:
Keep a DXY chart open alongside your XAUUSD chart. When you see a strong DXY move, wait for the corresponding gold move. Do not anticipate — wait for the gold move to confirm.

Trading Tip: If DXY and gold are both moving in the same direction, one of them is wrong. Usually, it is gold being noise. Trust DXY as the leader.`,
    `Fundamental analysis provides the context for your technical trades. In this bootcamp, fundamentals guide direction while technicals guide entries.

Key Fundamental Indicators:

1. US Interest Rates (Fed Funds Rate):
The single most important fundamental for gold. Gold thrives when rates are low or falling. When rates are high, gold faces headwinds.

2. US Dollar Strength:
Driven by interest rate differentials, economic growth, and risk sentiment. A strong dollar is bearish gold. A weak dollar is bullish gold.

3. Inflation (CPI, PCE):
Gold is the ultimate inflation hedge. Rising inflation supports gold prices. Falling inflation pressures gold.

4. Geopolitical Events:
Elections, conflicts, trade disputes. These create short-term volatility and medium-term trends in gold.

5. Economic Data:
NFP, GDP, Retail Sales, Manufacturing PMI. These drive short-term gold moves on release days.

Bootcamp Fundamental Routine:
- Monday: Check the weekly economic calendar
- Every morning: Note any scheduled high-impact events
- Before news: Reduce position sizes or close trades
- After news: Trade the established direction with technical confirmation

Fundamentals tell you the direction. Technicals tell you the entry. Never trade fundamental direction without a technical setup.`,
    `News trading requires a specific approach that differs from regular technical trading. This lesson covers how to handle high-impact news events.

The News Trading Framework:

Before the News (Preparation):
1. Identify high-impact events (NFP, CPI, Fed, FOMC Minutes)
2. Note the consensus expectation
3. Mark the release time on your calendar
4. Decide: will you trade or sit out?
5. If trading: decide your strategy in advance

During the News (Execution Strategy A: 15-Minute Rule):
1. Do NOT trade the initial 5 minutes (highest risk)
2. Wait 15 minutes for the initial volatility to settle
3. Identify the established direction
4. Look for a pullback to a technical level
5. Enter with a wider stop (300+ pips on gold)
6. Target 1: minimum 1:1 RRR, target 2: let run

During the News (Execution Strategy B: Straddle):
1. Place a buy stop 200 pips above current price
2. Place a sell stop 200 pips below current price
3. The triggered order catches the initial move
4. Cancel the other order immediately
5. Risk: if both get triggered, you lose both premiums

Risk Management for News:
- Reduce position size to 0.5-1% risk (not 2%)
- Use limit orders to avoid slippage
- Consider widening your stop to 300-500 pips
- Do not trade news if you cannot watch the screen

The best approach for beginners: skip the news entirely. Wait 30 minutes and trade the established trend with technical confirmation.`,
    `This lesson reviews and integrates the risk management system you will use throughout the bootcamp.

The Bootcamp Risk System:

Risk Per Trade: 2% maximum of account balance
Risk Per Day: 5% maximum (hard stop, close all positions)
Max Drawdown: 20% (stop trading, review for 2 weeks)
Min RRR: 1:2 (prefer 1:3)
Max Concurrent Trades: 2 (do not overextend)

Position Sizing Formula:
Position Size = (Account × Risk %) ÷ (Stop Pips × Pip Value)

Example: $2,000 account, 2% = $40 risk, 150-pip gold stop, $10/pip (standard lot)
$40 ÷ (150 × $10) = 0.027 standard lots (2.7 mini lots)

Account-Specific Guidelines:
- $500 account: micro lots only (0.01-0.09 max)
- $1,000 account: micro to mini lots
- $2,000+ account: mini lots standard
- $10,000+ account: standard lots possible

Stop Loss Rules:
- Day trade gold: 100-200 pip stop
- Swing trade gold: 300-500 pip stop
- Technical stop: below/above a swing point
- Never widen a stop once the trade is open

The Triple Check:
Before every trade in this bootcamp:
1. Position size is correct (2% risk)
2. Stop loss is at a technical level
3. RRR is minimum 1:2

If all three are not satisfied, the trade does not happen.`,
    `Psychology and discipline are the most important factors in trading success. Technical skills are useless without emotional control.

The Five Pillars of Trading Psychology:

1. Acceptance:
- Accept that losses are part of trading
- You will lose on 30-50% of trades (this is normal)
- No strategy has 100% win rate
- Losses are the cost of doing business

2. Patience:
- The market will give you opportunities every day
- You do not need to trade today
- Waiting for the perfect setup is a valid trade
- Boredom is the enemy — do not trade out of boredom

3. Discipline:
- Follow your plan, not your feelings
- The plan works over 100 trades, not 1 trade
- A losing trade that followed the plan is a GOOD trade
- A winning trade that broke the rules is a BAD trade

4. Detachment:
- Do not get attached to a trade or a position
- The market does not know you exist
- Price moves for institutional reasons, not personal ones
- Let your stop loss work — do not babysit every tick

5. Continuous Improvement:
- Every trade is a learning opportunity
- Journal everything
- Review weekly, adjust monthly
- Small improvements compound over time

Bootcamp Journal Requirement:
For every trade during mock sessions and live trading:
- Entry price, stop, target
- Position size and risk amount
- Setup type
- Emotional state
- Outcome and lesson

Your journal is your most important trading tool.`,
    `Trade planning is the process of defining exactly what you will do before the market opens. It removes emotion from decision making.

The Daily Trade Plan Template:

Date: __________
Instrument: XAUUSD
Account Balance: $________

Pre-Market Analysis:
Higher Timeframe Trend (Daily): _____ (uptrend/downtrend/range)
4-hour Structure: _____
Key Levels (Support/Resistance):
- Resistance 2: ______
- Resistance 1: ______
- Support 1: ______
- Support 2: ______

Planned Trades:
Setup Type: ______ (structure/OB/Asian breakout/other)
Direction: ___ (long/short)
Entry Zone: ______
Stop Loss: ______
Target 1: ______ (RRR: __)
Target 2: ______ (RRR: __)
Position Size: ______ (Risk $: __)

Conditions for Entry:
1. Price reaches entry zone __
2. Reversal candle forms __
3. Higher timeframe trend supports direction __
4. RRR is minimum 1:2 __

If today is a news day:
- News event: ______ at ______
- Plan: ______ (trade/wait/close positions)

Daily Limits:
- Max trades: 3
- Max loss: 5% ($____)
- After 3 losses: stop for the day

Create this plan every morning before the London session opens. It takes 10 minutes and will dramatically improve your trading results.`,
    `Journaling is the practice of recording every trade with detailed notes. It is the fastest way to improve as a trader.

The Complete Trade Journal Entry:

Date: 2026-07-15 | Time: 16:30 EAT
Instrument: XAUUSD
Direction: Long
Setup: Asian Range Breakout, London session confirmation

Entry: 1952.00
Stop: 1937.00 (15 pips)
Target 1: 1967.00 (1:1 RRR)
Target 2: 1982.00 (2:1 RRR)
Size: 0.27 mini lots
Risk: $40 (2% of $2,000)

Market Context:
- Daily trend: uptrend
- 4-hour: pullback to 50 EMA
- News today: none

Chart Screenshot URL: [link]
Emotions Before Entry: Slight anxiety (manageable)

Outcome: TP2 hit at 1982, +$81 (4.05%)

Self-Assessment:
- Did I follow my plan? Yes
- Did I enter on confirmation? Yes
- Did I manage risk correctly? Yes
- Discipline score (1-10): 8
- Lesson: The setup aligned with HTF trend — trust the confluence

Review Patterns Weekly:
After 20 journal entries, look for:
- Which setups win most often?
- What time of day are my best trades?
- What emotional patterns precede losses?
- Are my winners bigger than my losers?

A journal is not optional. The best traders have the best journals. Without a journal, you are trading blind.`,
    `In this live analysis session, we will walk through the XAUUSD market together and identify potential trades.

Market Context (Example):
- Daily Trend: Uptrend (HH/HL sequence intact)
- 4-Hour: Pulling back from resistance at 1975
- 1-Hour: Bearish structure (LH/LL on lower timeframe)
- Key Levels: Support 1930, Resistance 1975

Analysis Process:
1. Determine bias (daily trend = up, so we prefer longs)
2. Wait for pullback to end (look for CHoCH on 1-hour)
3. Identify entry zone (demand zone at 1930-1935)
4. Set alert at the zone
5. Wait for a reversal candle

Live Question: "Price is at 1945. Should we enter now?"
Answer: No. We identified 1930-1935 as our entry zone. 1945 is too high. If we enter at 1945, our stop would be tight and our RRR would be poor. Patience.

Live Question: "What if it never reaches our zone?"
Answer: That is fine. There will be other trades. Never chase price.

Live Question: "What is the best case scenario?"
Answer: Price drops to 1935, forms a bullish engulfing, we buy at 1937, stop at 1920, target at 1970. That is a 2:1 RRR.

Follow this analysis process every day. Record your own analysis in your journal. Compare your conclusions with the mentorship sessions.`,
    `Continuing the live analysis, we look at a different scenario — a market in a range with a potential breakout.

Market Context (Example):
- Daily Trend: Range (between 1900-1950 for 5 days)
- 4-Hour: Bouncing within the range
- 1-Hour: Testing resistance at 1950
- News Tomorrow: NFP release

Analysis Process:
1. In a range, we buy at support and sell at resistance
2. Price is at 1950 (range resistance) — potential short
3. But: daily trend has been in a range for 5 days — breakout coming
4. We do not trade ranges on NFP eve

Live Question: "So we should skip trading?"
Answer: For now, yes. Two reasons: price is in the middle of a range (no clear edge), and NFP is tomorrow (high risk overnight).

Live Question: "What should we prepare for NFP?"
Answer: Note current levels. Calculate if prices on either side of NFP create good trade setups. Plan your strategy (15-minute rule or skip entirely).

Live Question: "What levels matter for NFP?"
Answer: If NFP is bullish USD, support at 1900 is the key level. If NFP is bearish USD, resistance at 1950 is the breakout level.

Adjust Your Approach:
Sometimes the best trade is no trade. Recognizing low-probability conditions is as important as recognizing high-probability setups.`,
    `Mock trading sessions simulate real market conditions without financial risk. Treat these sessions as if real money is on the line.

Mock Trading Rules:
1. Use a demo account or paper trading platform
2. Record every trade in your journal
3. Apply the same risk management rules (2% max risk)
4. Follow all entry and exit rules
5. No deviations — even in a demo

Mock Session 1: Structure-Based Trading
- Focus on HH/HL and LH/LL entries
- Only trade in the direction of the daily trend
- Minimum RRR: 1:2
- Max trades: 3

Scenario 1: Strong Uptrend (Daily)
Price is in an uptrend, currently pulling back to 1930 (Higher Low forming).
Your task: Identify the HL entry. Set stop, target, position size.
Answer: Entry at 1932 (after bullish reversal candle), stop below 1920 (the previous HL), target 1960 (1:2.8 RRR), size based on 2% risk.

Scenario 2: Range Market
Price is in a range between 1900-1950. It has tested 1950 three times.
Your task: Identify the trade at range boundaries.
Answer: At 1950, look for a bearish signal. If a shooting star forms, short at 1948, stop above 1955, target 1900 (1:6.9 RRR). But be aware: multiple tests of resistance often lead to a breakout. If the 4th test breaks above, do not short — wait for the breakout.

Scenario 3: Downtrend Pullback
Price is in a daily downtrend (LH/LL). Currently bouncing to a Lower High near 50 EMA.
Your task: Identify the short entry.
Answer: Wait for a bearish reversal candle at 50 EMA. Short on confirmation, stop above the swing high, target the previous Low.

Complete all three scenarios and journal them.`,
    `Continue the mock trading session with more complex scenarios.

Scenario 4: News Event (NFP)
Gold is at 1945. NFP comes out in 30 minutes. Consensus: +180K jobs.
Your task: Plan for before, during, and after NFP.

Pre-NFP: Close all open positions. Note current price (1945). Set alerts at 1930 and 1960.
During NFP: Do not trade the first 5 minutes. Wait for volatility to settle.
Post-NFP (30 min): Identify the established direction. Enter on a pullback with a wider stop.
If NFP beats (200K+): USD strong, gold likely falls. Look for shorts at technical levels.
If NFP misses (<150K): USD weak, gold likely rallies. Look for longs at technical levels.
If in line (170-190K): Mixed reaction. Best to skip entirely.

Scenario 5: Multiple Confluence
Conditions today:
- Daily trend: up
- 4-hour demand zone: 1930-1935
- 1-hour bullish order block at 1932
- DXY breaking support
Your task: Are you trading? If so, how?

Analysis: Four factors all point to a long trade. This is maximum confluence.
Plan: Buy at 1934 (after reversal candle at the OB), stop 1915 (below demand zone), target 1975 (2:1.2 RRR). Size normally (2% risk).

Scenario 6: Conflicting Signals
Conditions today:
- Daily trend: up
- 4-hour supply zone at 1960
- 1-hour: price at 1960 with bearish engulfing
But: NFP in 1 hour.
Your task: Is this a trade?

Analysis: Daily up, but 4-hour supply at exact price. Short-term signal is short. But news in 1 hour. DO NOT TRADE. The conflicting timeframes + impending news create too much risk. Wait for NFP.

Mock trading reveals your emotional patterns without the cost. Review your mock journal entries as seriously as real trades.`,
    `This lesson reviews your mock trading performance and identifies areas for improvement.

Performance Review Process:

Step 1: Compile Your Data
- Total mock trades taken: ___
- Win rate: ___
- Average RRR: ___
- Total P&L (pips): ___
- Total P&L (%): ___
- Largest win (pips): ___
- Largest loss (pips): ____

Step 2: Identify Patterns
- Which setups had the highest win rate?
- What time of day were your best trades?
- What was your most common mistake?
- Did your discipline slip as the session progressed?

Step 3: Common Mistakes Checklist
- Did you enter before confirmation? ___
- Did you move your stop? ___
- Did you overtrade (more than 3 trades)? ___
- Did you chase a trade after missing the entry? ___
- Did you trade against the daily trend? ___

Step 4: Adjustment Plan
Based on your review, what will you change?
- One thing to STOP doing: ___
- One thing to START doing: ___
- One thing to CONTINUE doing: ___

The goal of mock trading is not to make money — it is to build habits. The habits you build in demo will carry directly to your live trading.

If your mock trading performance is below 40% win rate or average RRR below 1:1, spend another week on mock trading before proceeding.`,
    `Backtesting is the practice of testing your strategy on historical data. It is the most reliable way to validate a trading approach.

The Backtesting Process:

1. Select Your Strategy:
Choose ONE specific setup to backtest (e.g., Asian Range breakout on gold).

2. Define the Rules:
- Entry conditions (exact price, candle pattern, confirmation)
- Stop loss placement (exact rules)
- Take profit targets (exact rules)
- Risk management (fixed position size or fixed % risk)

3. Collect Data:
- Use TradingView or your platform's bar replay
- Select 50-100 historical examples
- Go back 3-6 months minimum

4. Execute the Test:
- Scroll back to the start of the period
- Advance one candle at a time
- Record every signal (whether you trade it or not)
- Apply EXACTLY the same rules every time

5. Record Results For Each Trade:
- Date and time
- Entry price
- Stop loss
- Take profit
- Outcome (win/loss/breakeven)
- Pips gained or lost

6. Analyze Results:
- Win rate (%)
- Average win (pips)
- Average loss (pips)
- Profit factor (total wins ÷ total losses)
- Expectancy per trade: (win rate × avg win) - (loss rate × avg loss)

Good Backtesting Results:
- Win rate: 40-60% (for 1:2 RRR strategy)
- Profit factor: >1.5
- Expectancy: positive
- Consistent across different market conditions

Bootcamp Assignment: Backtest your primary setup on 100 historical gold trades. Submit your results.`,
    `Forward testing (also called paper trading) is testing your strategy on live market data without real money. It bridges the gap between backtesting and live trading.

Forward Testing Rules:

1. Use a Demo Account:
- Set up a demo account with a broker that offers realistic conditions
- Do NOT use a demo that gives you $1,000,000 (use $2,000-5,000)
- Use the same platform you will trade live

2. Apply Your Strategy:
- Trade ONLY your primary setup (the one you backtested)
- Do not add new setups during testing
- Apply the exact same rules as backtesting

3. Duration:
- Minimum: 20 trades OR 1 month (whichever comes second)
- Target: 50 trades for statistical significance
- Do not switch strategies during the testing period

4. What to Track:
- Same metrics as backtesting (win rate, RRR, profit factor)
- Additionally: slippage, spread costs, execution quality
- Journal your emotional state for each trade

Forward Testing Expectations:
- Results will be WORSE than backtesting (usually 10-20% lower)
- This is normal — backtesting does not account for slippage, emotions, or execution
- If forward testing results are still positive, the strategy is viable

Minimum Viable Results to Go Live:
- 20+ trades completed
- Win rate within 10% of backtest
- Positive expectancy
- You feel confident executing the plan

Bootcamp Assignment: Complete 20 forward-tested trades using your primary setup. Submit results for review before going live.`,
    `Performance evaluation measures your trading quantitatively. Without measurement, improvement is impossible.

Key Performance Metrics:

1. Win Rate (%):
Not the most important metric, but useful. 40% win rate with 1:3 RRR is fine. 70% win rate with 1:1 RRR is fine. What matters is the combination.

2. Average Risk-to-Reward (RRR):
Average Win (pips) ÷ Average Loss (pips)
Target: >1.5 (prefer >2.0)

3. Profit Factor:
Total Pips Won ÷ Total Pips Lost
Target: >1.5 (means you earn 1.5x what you lose)

4. Expectancy:
(Win Rate × Average Win) - (Loss Rate × Average Loss)
If positive, your strategy is profitable. If negative, keep testing.

5. Maximum Drawdown:
Largest peak-to-trough decline in your account
Target: <15% for consistency

6. Sharpe Ratio:
A measure of risk-adjusted returns
Higher is better (>1.0 is good)

Performance by Account Size:
$1,000 account: target 3-5% monthly return ($30-50)
$2,000 account: target 3-5% monthly return ($60-100)
$5,000 account: target 2-4% monthly return ($100-200)

These are realistic targets. Anyone promising 20% monthly returns is taking extreme risk that will eventually blow the account.

Evaluation Schedule:
- Daily: Count trades, check if limits were respected
- Weekly: Calculate all metrics for the week
- Monthly: Comprehensive review with strategy adjustments
- Quarterly: Major strategy evaluation and resource allocation

If your metrics are not improving after 3 months of consistent tracking, change your approach or seek mentorship.`,
    `This lesson covers the most common mistakes traders make and how to avoid them.

Mistake 1: Overtrading
- Symptoms: More than 3 trades daily, trading low-probability setups
- Cause: Boredom, FOMO, revenge trading
- Solution: Set a max trade limit (3 per day). When that limit is hit, close the charts.

Mistake 2: Poor Risk Management
- Symptoms: Risking more than 2% per trade, inconsistent position sizing
- Cause: Overconfidence after wins, desperation after losses
- Solution: Automate position sizing with a calculator. Never override it.

Mistake 3: Trading Against the Trend
- Symptoms: Taking counter-trend trades, "calling tops and bottoms"
- Cause: Ego, desire to be right, impatience
- Solution: Check daily trend before every trade. Only trade in its direction.

Mistake 4: Moving Stop Losses
- Symptoms: Widening stops, "giving the trade more room"
- Cause: Hope, inability to accept loss
- Solution: Set your stop at entry. Never, ever move it away from price.

Mistake 5: Taking Profit Too Early
- Symptoms: Closing winners at breakeven or 1:1 when target is 1:3
- Cause: Fear of losing unrealized profit
- Solution: Use partial profits (take 30-50% at 1:1, let the rest run).

Mistake 6: Revenge Trading
- Symptoms: Increasing size after a loss, trading immediately after a loss
- Cause: Ego, desire to "get it back"
- Solution: After any loss, close the platform for 30 minutes minimum.

Mistake 7: Not Journaling
- Symptoms: No written record of trades, vague memory of past performance
- Cause: Laziness, overconfidence in memory
- Solution: Journal is mandatory. No journal = no trading.

Mistake 8: Overcomplicating
- Symptoms: Using 10 indicators, checking 5 timeframes, hesitating
- Cause: Seeking certainty in an uncertain market
- Solution: Use 3 things: market structure, one S/D or OB level, and price action.

Review this checklist weekly. Identify which mistakes you made. Focus on eliminating one mistake at a time.`,
    `Advanced entry techniques improve your precision and reduce drawdown on the trades you take.

Technique 1: Limit Orders on Retests
Instead of entering at market when price reaches your zone, place a limit order at the zone boundary.

Example: Demand zone is 1930-1935. Instead of waiting for a candle to close, place a limit buy at 1932. If price reaches it, you get a better entry. If not, no trade.

Technique 2: Scaling In
Enter with 50% of your intended position at the first signal. Add the second 50% if price retests the zone and rejects again.

Example: Planned position is 0.4 mini lots. Enter 0.2 at first signal. If price retests and holds, add 0.2. Average entry is better than one entry at a worse price.

Technique 3: Multiple Timeframe Entry
Your setup is on the 1-hour chart. But use the 15-minute chart for entry timing. Don't enter until the 15-minute chart confirms with a reversal candle.

Technique 4: Avoiding the First Candle
After price reaches your zone, wait for the FIRST reversal candle to close. Enter on the SECOND candle. This filters out false signals.

Technique 5: Volume Confirmation
If your platform shows volume, check that the reversal candle has higher volume than the previous candles. Higher volume = institutional participation = higher probability.

Entry Sequence for the Bootcamp:
1. Mark your zone (from 1-hour or 4-hour setup)
2. Wait for price to enter the zone
3. Wait for a reversal candle to close
4. Enter on the next candle
5. Place stop beyond the zone
6. Set targets based on structure

Practice these entry techniques on your demo account before using them live.`,
    `Advanced exit techniques maximize your profits by managing how and when you close positions.

Technique 1: Partial Profits (Scalping Exit)
Take 30-50% of your position at TP1 (1:1 RRR). Let the rest run to TP2.

Example: 0.4 mini lots at 1:3 target.
At 1:1: close 0.15 lots (37%). Gain: +$15 (based on stop being $40).
At 1:3: close remaining 0.25 lots. Gain: +$45.
Total: +$60 on a $40 risk (1:1.5 RRR on the whole trade).

Technique 2: Trailing Stop
Once price reaches 1:1, move your stop to breakeven. Then trail 50 pips behind price on the 15-minute chart.

Each time price makes a higher swing low (long trade), move the stop below that swing low.
This lets you capture the full trend while protecting profits.

Technique 3: Structure-Based Exit
Exit when price reaches a clear supply/demand zone or swing point on the higher timeframe.

Long trade: exit at the next 4-hour supply zone or swing high.
Short trade: exit at the next 4-hour demand zone or swing low.

Technique 4: Time-Based Exit
If price has not reached your target within X days (1 day for day trades, 5 days for swing trades), close the position. Your thesis is not working.

Technique 5: Breakeven Plus
Once price reaches 1:1, move stop to entry +10 pips. This guarantees a small profit even if reversed immediately.

Exit Decision Framework:
- Has price reached TP1? → Take partial
- Has price reached TP2? → Close full
- Has structure changed? → Close immediately
- Is price stalling for 2+ hours near a level? → Consider closing
- Is a news event coming? → Reduce size or close

The best traders let their winners run. Use trailing stops and partial profits to capture trends while protecting your capital.`,
    `Scaling positions is an advanced technique for increasing trade size as your account grows.

When to Scale:
- Account has grown 20%+ from starting balance
- You have 50+ live trades in your journal
- Win rate is consistent for 3+ months
- Drawdown has been below 10% for 3+ months

How to Scale:

Method 1: Proportional Scaling
As your account grows, your 2% risk grows in dollar terms.
$2,000 account: 2% = $40 → 0.27 mini lots
$4,000 account: 2% = $80 → 0.53 mini lots
You do not need to change your behavior — position size grows automatically.

Method 2: Tier Scaling
Set thresholds and increase size only when reaching a new threshold.
Example:
- $2,000-3,999: 0.3 mini lots maximum
- $4,000-5,999: 0.6 mini lots maximum
- $6,000-9,999: 1.0 mini lots maximum
- $10,000+: full position sizing

Method 3: Multiple Setup Scaling
Start with one setup (Asian Range Breakout). Add a second setup (Order Block) when:
- Setup 1 has 50+ trades with positive expectancy
- You can execute both without confusion
- Account has buffer for the increased trade frequency

What NOT to Do:
- Do not increase your RISK % per trade (always 2%)
- Do not increase size after a win (emotional decision)
- Do not increase frequency before you are profitable
- Do not scale until you have data proving your strategy works

Scaling is a reward for consistency, not a tool for faster growth. Premature scaling is the fastest way to lose an account.`,
    `Portfolio management is about managing your overall trading activity, not just individual trades.

Correlation Management:
- Gold is your primary instrument
- If you also trade EUR/USD, note that EUR/USD and gold can move together
- Correlated positions increase your effective risk
- If you trade two highly correlated pairs, halve your position size on each

Trade Frequency Management:
- Maximum: 3 trades per day (quality over quantity)
- Minimum: 0 trades (waiting for the right setup is valid)
- Average: 10-15 trades per week (if consistently active)
- After a losing day: 0 trades for the rest of the day

Account Growth Targets:
- Monthly: 3-8% (consistent growth)
- Quarterly: 10-20% (compounding)
- Annual: 30-60% (realistic for skilled traders)
- Anything above 10% monthly involves unsustainable risk

Drawdown Management Plan:
- 5% drawdown: continue normally (within expected range)
- 10% drawdown: halve position sizes, review all trades
- 15% drawdown: stop trading for 1 week, comprehensive review
- 20% drawdown: stop trading for 2 weeks, consider mentorship

Capital Allocation:
- Trading capital: 100% (your total account)
- Emergency reserve: maintain separate savings (not in trading account)
- Profit withdrawal: consider withdrawing 50% of monthly profits
- Reinvestment: keep 50% of monthly profits to grow the account

Your portfolio is your business. Manage it with discipline. Track your metrics monthly and make adjustments based on data, not emotions.`,
    `This is the first live mentorship session. We will discuss your progress, answer questions, and provide guidance.

Mentorship Session Format:
- Review of the past week's trades
- Q&A on specific challenges
- Live chart analysis
- Individual feedback on journal entries

Common Questions from This Stage:

Question: "I am struggling to wait for confirmation before entering."
Answer: This is the most common challenge. The urge to enter early comes from fear of missing the move. Solution: remind yourself that there will always be another trade. If you miss this one, the next one will come. Force yourself to wait for the candle close before entering. It will feel wrong for the first 20 trades. Then it becomes habit.

Question: "My stop loss keeps getting hit, then price reverses."
Answer: Two possible issues: (1) your stop is too tight — gold needs 100-200 pips of room; (2) you are entering at the wrong level — you should be entering at structure levels, not in the middle of a move. Review your entry criteria.

Question: "How do I know if my strategy is working?"
Answer: You need 50+ trades for statistical significance. Do not evaluate after 10 trades. Track win rate AND average RRR. A 40% win rate with 1:3 RRR is excellent.

Mentorship Tips for This Week:
1. Focus on process, not P&L. If you followed the plan, it was a good day regardless of profit.
2. Reduce screen time. Checking charts every 5 minutes creates anxiety and leads to overtrading.
3. Read one chapter of "Trading in the Zone" this week. It will change how you think about losses.

Come to next session with your journal ready. We will review your trades together.`,
    `Second mentorship session focusing on advanced execution and mindset.

Progress Check:
- How many trades since last session? ___
- Win rate: ___%
- Average RRR: ___
- Biggest challenge this week: ___

Common Issues at This Stage:

Issue 1: "I took a trade that was not in my plan."
This is a discipline breach. Review the entry checklist before every trade. Add a 10-second pause before clicking "buy" or "sell" — use that time to mentally check your plan.

Issue 2: "I let a winner turn into a loser."
Move your stop to breakeven when price reaches 1:1. This is non-negotiable. If you do not do this, add it as a timer immediately after entry.

Issue 3: "I have been in a drawdown and it is affecting my judgment."
Reduce position sizes by 50% until you recover. This reduces the emotional weight of each trade. Your goal shifts from "make money" to "follow the plan."

Advanced Topic: Market Profiling
Beyond structure, learn to identify:
- High-volume nodes (price levels with most trading activity)
- Low-volume zones (gaps where price moved quickly)
- Value area (price range where 70% of volume occurred)

Top-down analysis:
Daily → 4-hour → 1-hour → trade plan

Record your top-down analysis every morning and share it in the next mentorship session.`,
    `Third mentorship session focusing on performance review and strategy refinement.

Performance Metrics Review:
- Total bootcamp trades: ___
- Win rate: ___%
- Profit factor: ___
- Maximum drawdown: ___%
- Current account: $___ (+___%)

Strategy Refinement:
Based on your data, which setups are working best?
- Setup 1 (Asian Range): ___ trades, ___% win rate
- Setup 2 (Order Block): ___ trades, ___% win rate
- Setup 3 (Supply/Demand): ___ trades, ___% win rate

Focus on your BEST setup. If one setup has significantly better results, trade it exclusively until it stops working.

Common Questions:

Question: "Should I add more indicators?"
No. More indicators = more confusion. Market structure + price action + one key level is sufficient. Adding more reduces your confidence because they will conflict.

Question: "Should I trade during low volatility?"
Only if price reaches your key levels. During low volatility (Asian session), price often does not reach significant levels. It is fine to have 0 trades during low volatility.

Question: "What is the most important thing to work on now?"
Journaling. If you are not journaling every trade, start now. If you are journaling, review your last 20 entries and identify patterns.

Advanced Topic: Order Flow Interpretation
Learning to read the footprints of institutional traders:
- Large stop runs = liquidity grabs
- Gaps in volume = fast institutional execution
- Cluster of volume at a level = significant level

This week's focus: refine to your best 1-2 setups. Eliminate the rest.`,
    `Final group mentorship session covering exam preparation and transition to live trading.

Exam Preparation:
- Review all bootcamp lessons (especially risk management and structure)
- Practice on demo: identify 10 valid setups without entering
- Know your position sizing formula cold
- Be able to explain your entry, stop, and target reasoning

Transitioning to Live Trading:

Step 1: Start Small
- Use minimum lot sizes (0.01 lots)
- Risk only 1% per trade for the first 20 live trades
- Goal: build confidence, not P&L

Step 2: Prove Consistency
- 20 live trades with positive expectancy
- Discipline score average 7+ out of 10
- Maximum drawdown below 8%

Step 3: Scale Gradually
- Only after 50+ live trades
- Move from 1% to 1.5% risk
- Keep the same setups (do not add new ones)

Step 4: Maintain Discipline
- Continue journaling every trade
- Continue weekly reviews
- Never stop learning

Common Final Stage Questions:

Question: "Am I ready to trade live?"
If you have:
- Consistent positive expectancy on demo (50+ trades)
- A written plan you follow consistently
- No emotional issues with losing trades
- Risk management that you apply automatically

Then yes, you are ready. Start small.

Question: "What if I blow my first live account?"
Start with the smallest amount you can fund. If you lose it, return to demo for 50 more trades. Losing a small account is a tuition fee — learn from it.

Graduation is not the end of learning. It is the beginning of your real education as a trader. The market is the final teacher. Stay humble. Stay disciplined. Keep learning.`,
    `This lesson prepares you for the certification exam. Review the key concepts that will be tested.

Exam Topics:

1. Market Structure (20%)
- Identify HH/HL uptrend, LH/LL downtrend
- Define Break of Structure (BOS) and Change of Character (CHoCH)
- Explain the three market conditions: uptrend, downtrend, range
- Multiple timeframe analysis hierarchy

2. Risk Management (20%)
- Position sizing formula
- 2% rule and daily loss limits
- Stop loss placement and types
- Drawdown control strategies

3. Gold Trading (15%)
- Gold pip structure and position sizing
- Gold-DXY correlation
- Key drivers of gold prices
- Gold Asian Range strategy

4. Supply and Demand (15%)
- Identifying supply and demand zones
- Fresh vs tested zones
- Supply/demand vs support/resistance
- Trading supply/demand reversals

5. Order Blocks and Liquidity (10%)
- Identifying bullish and bearish OBs
- Liquidity zones and grab patterns
- Trading the liquidity grab + OB combination

6. Psychology and Discipline (10%)
- The four emotional killers
- Building a trading routine
- Journaling methodology
- Recovery from drawdown

7. Trade Management (10%)
- Entry techniques (limit orders, scaling, confirmation)
- Exit techniques (partial profits, trailing, structure-based)
- Risk-reward ratio management

Exam Format:
- 30 questions
- Mix of multiple choice and short answer
- 1-hour time limit
- 80% or higher to pass

Study Materials:
- Review all bootcamp lessons 1-33
- Focus on this list: topic summaries
- Your own journal entries

Good luck. You have prepared for this.`,
    `The final Q&A session before the exam. Bring your last questions.

Common Final Questions:

Question: "My setup appeared but I was not at my computer. Should I chase it?"
No. There will be another setup. Chasing leads to bad entries and emotional trading. Accept that you missed it and wait for the next one.

Question: "I have been profitable for 2 months. Should I increase my risk?"
Increase your position size proportionally as your account grows (2% of larger account = more dollars). Do not increase the risk percentage. A 2% risk rule that works at $1,000 works at $10,000.

Question: "Should I trade multiple instruments?"
Master ONE instrument before adding others. Gold is your instrument. Trade it exclusively for 6 months before considering EUR/USD or other pairs.

Question: "What is the most important advice for new traders?"
Three things:
1. Risk management is everything. Protect your capital first.
2. Process over profit. Good process leads to profit over time.
3. Be patient. Trading mastery takes years, not months.

Exam Tips:
- Read each question carefully
- Show your work for calculation questions
- If unsure, eliminate wrong answers first
- Manage your time (2 minutes per question)
- Do not leave questions unanswered

After the exam:
- Review your answers carefully
- Identify which topics you struggled with
- Focus your continuing education on those areas

This is not the end. It is the beginning of your journey as a funded trader.`,
    `This final review brings together everything from the bootcamp into a simple, repeatable system.

Your Bootcamp Trading System:

1. Morning Preparation (10 min):
- Check daily trend
- Mark 4-hour structure
- Identify key levels
- Review economic calendar

2. Trade Evaluation (before each trade):
- Does this trade follow the daily trend?
- Is there a clear entry trigger at a key level?
- Is the RRR minimum 1:2?
- Is the position size correct (2% risk)?
- Am I calm and focused?

3. Trade Execution:
- Enter on confirmed signal
- Set stop at technical level
- Take partial profit at 1:1
- Trail stop for remainder
- Journal immediately

4. Post-Session Review (5 min):
- Count trades (max 3)
- Rate discipline (1-10)
- Identify one improvement

5. Weekly Review (30 min):
- Calculate all metrics
- Review journal entries
- Plan next week

The Bootcamp Promise:
If you follow this system for 90 days with discipline, you will be a different trader than when you started. You will have data, not guesses. You will have habits, not hopes. You will have a process that works.

The Market's Gift:
The market gives you unlimited opportunities. It does not care if you miss one. It does not care if you lose one. It will give you another tomorrow. The only requirement: you must stay in the game.

You have completed the Full Trading Bootcamp. Now the real work begins. Take this system, apply it daily, and build your trading career.

Congratulations, bootcamp graduate. FundedBirr Academy is proud of you.`,
    `Congratulations, graduate.

You have completed all 36 lessons of the Full Trading Bootcamp. This graduation lesson marks your transition from student to trader.

What You Have Achieved:
- Mastered market structure analysis
- Built a complete risk management system
- Developed discipline and routine
- Completed mock and forward testing
- Participated in mentorship sessions
- Passed the certification exam

Your Next Steps:

1. Start Live Trading (Small):
- Fund a small account (minimum deposit)
- Trade minimum lot sizes
- Risk 1-1.5% per trade for the first month
- Focus on consistency, not profit

2. Continue Your Education:
- Review bootcamp lessons regularly
- Read one trading book per month
- Stay active in the FundedBirr community
- Attend future mentorship sessions

3. Join the FundedBirr Challenge:
- When you are consistently profitable on your personal account
- Apply your skills in a funded challenge
- Qualify for a FundedBirr trading account
- Scale up to professional trading

4. Stay Connected:
- WhatsApp: Contact us anytime for support
- Live sessions: Weekly market analysis streams
- Community: Connect with other graduates

Remember the Bootcamp Principles:
- Risk management first, always
- Process over profit
- Discipline beats intelligence
- Every trade is independent
- The market will always give you another opportunity

You have the knowledge. You have the system. Now go execute.

Welcome to the ranks of FundedBirr Academy graduates. Your trading journey has just begun.`,
  ],
  'certification': [
    `Welcome to the FundedBirr Academy Certification Exam. This exam tests your knowledge across all course materials.

Exam Overview:
- 30 questions covering all aspects of trading
- Topics: market structure, risk management, gold trading, psychology
- Passing score: 80% or higher
- Time limit: 60 minutes
- Format: multiple choice and calculation

Instructions:
1. Read each question carefully before answering
2. Show your work for calculation questions
3. Manage your time — about 2 minutes per question
4. Do not leave any question unanswered
5. When complete, submit your answers for review

Sample Questions:

Question 1 (Market Structure):
You see a series of Higher Highs and Higher Lows on the daily chart. What is the market condition?
a) Uptrend ✓
b) Downtrend
c) Range
d) Indecision

Question 2 (Risk Management):
Your account is $3,000. You risk 2% per trade. Your stop loss is 150 pips on gold. What is your position size in mini lots? (Pip value for mini lot XAU = $1)
a) 0.1 mini lots
b) 0.4 mini lots ✓ ($3,000 × 0.02 = $60, $60 ÷ (150 × $1) = 0.4)
c) 1.0 mini lots
d) 0.04 mini lots

Question 3 (Gold Trading):
DXY is breaking support. What would you expect gold to do?
a) Fall
b) Rise ✓ (inverse correlation)
c) Stay flat
d) Cannot determine

Question 4 (Supply/Demand):
A demand zone that has never been retested is called:
a) Weak zone
b) Fresh zone ✓
c) Invalid zone
d) Tested zone

Question 5 (Psychology):
After three consecutive losses, you should:
a) Increase size to recover faster
b) Stop trading for the day ✓
c) Switch to a different strategy
d) Trade smaller timeframes

Question 6 (Trade Management):
When should you move your stop loss to breakeven?
a) Immediately after entry
b) When price reaches 1:1 risk-to-reward ✓
c) When price reaches target
d) Never move your stop

Question 7 (Order Blocks):
A bearish order block is the last ____ candle before a strong downward move.
a) Bullish ✓ (institutions' final buying before selling)
b) Bearish
c) Doji
d) Indecision

Question 8 (Position Sizing):
You have a $500 account. Risk per trade is 2%. Stop is 50 pips on EUR/USD. Pip value is $1 (mini lot). Position size?
a) 0.5 mini lots
b) 0.2 mini lots ✓ ($500 × 0.02 = $10, $10 ÷ (50 × $1) = 0.2)
c) 1.0 mini lots
d) 0.05 mini lots

Question 9 (Bootcamp):
What is the recommended maximum number of trades per day in the bootcamp?
a) 5
b) 3 ✓
c) 10
d) Unlimited (trade whenever you see a setup)

Question 10 (Final):
The most important factor in long-term trading success is:
a) Having the best entry strategy
b) Risk management and discipline ✓
c) The fastest internet connection
d) Following signal providers

Passing this certification confirms you have the knowledge to trade professionally. Apply what you have learned with discipline, and continue to grow as a trader.

Congratulations on completing your FundedBirr Academy certification!`,
  ],
}

export default function LessonPlayer() {
  const params = useParams()
  const slug = params.slug as string
  const lessonId = parseInt(params.lessonId as string, 10)

  const [lessons, setLessons] = useState<{ id: string; title: string; order_num: number }[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [completing, setCompleting] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [lessonsRes, progressRes] = await Promise.all([
          fetch(`/api/academy/lessons?course_id=${slug}`),
          fetch(`/api/academy/progress?user_id=demo-user&course_id=${slug}`),
        ])
        if (lessonsRes.ok) {
          const data = await lessonsRes.json()
          setLessons(data)
        }
        if (progressRes.ok) {
          const data = await progressRes.json()
          setCompletedIds(new Set((data.lessons || []).filter((l: { completed: boolean }) => l.completed).map((l: { id: string }) => l.id)))
        }
      } catch { /* ignore */ } finally {
        setLoadingProgress(false)
      }
    }
    load()
  }, [slug, lessonId])

  const currentLesson = lessons.find(l => l.order_num === lessonId)
  const isCompleted = currentLesson ? completedIds.has(currentLesson.id) : false

  const handleComplete = async () => {
    if (!currentLesson || completing) return
    setCompleting(true)
    try {
      const res = await fetch('/api/academy/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'demo-user',
          lesson_id: currentLesson.id,
          course_id: slug,
        }),
      })
      if (res.ok) {
        setCompletedIds(prev => new Set([...prev, currentLesson.id]))
      }
    } catch { /* ignore */ } finally {
      setCompleting(false)
    }
  }

  const course = COURSES[slug]
  if (!course) {
    return (
      <section className="section" style={{ textAlign: 'center', paddingTop: '6rem' }}>
        <h1 className="section-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <p className="section-sub" style={{ margin: '0 auto 2rem' }}>Course not found.</p>
        <Link href="/courses" className="btn-primary">&larr; Back to Courses</Link>
      </section>
    )
  }

  const totalLessons = course.lessons
  if (isNaN(lessonId) || lessonId < 1 || lessonId > totalLessons) {
    return (
      <section className="section" style={{ textAlign: 'center', paddingTop: '6rem' }}>
        <h1 className="section-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <p className="section-sub" style={{ margin: '0 auto 2rem' }}>Lesson not found.</p>
        <Link href={`/courses/${slug}`} className="btn-primary">&larr; Back to Course</Link>
      </section>
    )
  }

  const titles = LESSON_TITLES[slug] || []
  const content = LESSON_CONTENT[slug] || []
  const title = titles[lessonId - 1] || `Lesson ${lessonId}`
  const hasContent = !!content[lessonId - 1]
  const body = content[lessonId - 1] || ''
  const prevLesson = lessonId > 1 ? lessonId - 1 : null
  const nextLesson = lessonId < totalLessons ? lessonId + 1 : null

  return (
    <section className="section" style={{ paddingTop: '5rem' }}>
      {/* Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        marginBottom: '2rem',
      }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
        <span style={{ opacity: 0.5 }}>/</span>
        <Link href="/courses" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Courses</Link>
        <span style={{ opacity: 0.5 }}>/</span>
        <Link href={`/courses/${slug}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{course.title}</Link>
        <span style={{ opacity: 0.5 }}>/</span>
        <span style={{ color: 'var(--text)' }}>{title}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '2rem',
        alignItems: 'start',
      }}>
        {/* Sidebar */}
        <div className="card" style={{
          padding: '1.5rem',
          borderColor: 'rgba(201,145,42,0.2)',
        }}>
          <h3 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '1rem',
            marginBottom: '1rem',
            color: 'var(--gold-light)',
          }}>
            Course Content
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {titles.map((t, i) => {
              const lessonNum = i + 1
              const isActive = lessonNum === lessonId
              return (
                <Link
                  key={lessonNum}
                  href={`/courses/${slug}/lesson/${lessonNum}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    color: isActive ? 'var(--gold-light)' : 'var(--text-muted)',
                    background: isActive ? 'rgba(201,145,42,0.1)' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    background: isActive ? 'var(--gold-light)' : 'rgba(201,145,42,0.15)',
                    color: isActive ? 'var(--navy)' : 'var(--gold-light)',
                    flexShrink: 0,
                  }}>
                    {lessonNum}
                  </span>
                  <span style={{ lineHeight: 1.3 }}>{t}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Lesson Content */}
        <div>
          <div style={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <div>
              <span style={{
                fontSize: '0.77rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Lesson {lessonId} of {totalLessons}
              </span>
              <h1 className="section-title" style={{ margin: '0.25rem 0 0', fontSize: '1.75rem' }}>{title}</h1>
            </div>
          </div>

          <div className="card" style={{
            padding: '2rem',
            borderColor: 'rgba(201,145,42,0.15)',
            lineHeight: 1.8,
            fontSize: '0.95rem',
            color: 'var(--text)',
          }}>
            {hasContent && body ? body.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={idx} style={{ margin: '1rem 0', paddingLeft: '1.5rem' }}>
                    {paragraph.split('\n').map((line, li) => (
                      <li key={li} style={{ marginBottom: '0.25rem' }}>{line.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                )
              }
              if (paragraph.match(/^\d+\.\s/)) {
                const lines = paragraph.split('\n')
                const firstLine = lines[0]
                if (firstLine.match(/^\d+\.\s/)) {
                  const num = firstLine.match(/^(\d+)\.\s+(.+)/)
                  if (num) {
                    return (
                      <div key={idx} style={{ marginBottom: '1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--gold-light)', marginBottom: '0.25rem' }}>{num[1]}. {num[2]}</div>
                        {lines.slice(1).map((line, li) => (
                          <p key={li} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem' }}>{line}</p>
                        ))}
                      </div>
                    )
                  }
                }
              }
              return <p key={idx} style={{ marginBottom: '1rem' }}>{paragraph}</p>
            }) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'rgba(201,145,42,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontSize: '1.2rem',
                  color: 'var(--gold-light)', marginBottom: '0.75rem',
                }}>
                  Premium Content
                </h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                  This lesson is part of the {course.title} course. Enroll to access all {totalLessons} lessons with detailed educational content.
                </p>
                <Link href={`/courses/${slug}`} className="btn-gold" style={{ color: 'var(--navy)', textDecoration: 'none' }}>
                  Enroll Now
                </Link>
              </div>
            )}
          </div>

          {/* Mark as Complete */}
          {!loadingProgress && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1.5rem',
            }}>
              {isCompleted ? (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '6px',
                  background: 'rgba(40,168,106,0.1)',
                  color: 'var(--green)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Completed
                </span>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={completing}
                  className="btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: 'none',
                    background: 'var(--green)',
                    opacity: completing ? 0.6 : 1,
                    cursor: completing ? 'not-allowed' : 'pointer',
                  }}
                >
                  {completing ? 'Saving...' : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Mark as Complete
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
            gap: '1rem',
          }}>
            {prevLesson ? (
              <Link
                href={`/courses/${slug}/lesson/${prevLesson}`}
                className="btn-outline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Previous Lesson
              </Link>
            ) : <div />}
            {nextLesson ? (
              <Link
                href={`/courses/${slug}/lesson/${nextLesson}`}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Next Lesson
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ) : (
              <Link
                href={`/courses/${slug}`}
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Complete Course
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
