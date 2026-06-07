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

Premium Content

This is a preview of the Forex Fundamentals course. The remaining lessons — Position Sizing, Order Types, Interest Rates, NFP, CPI, Central Bank Policy, Carry Trade, and the full Analysis Framework — are available when you enroll.

Enroll now for 500 ETB to access all 12 lessons with detailed examples and practice exercises.`,
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

Premium Content

This is a preview of Gold Trading Mastery. The full course includes Order Blocks, Liquidity Zones, DXY Correlation, Asian Range Strategy, London Breakout, New York Momentum, News Trading, and 11 more in-depth lessons.

Enroll now for 1,500 ETB to access all 18 lessons with advanced strategies and live trade examples.`,
    `Order blocks are institutional price levels where large buyers or sellers have placed significant orders. They are the footprints of smart money on your chart.

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

Premium Content

Advanced order block concepts including mitigated blocks, unmitigated blocks, and the relationship between order blocks and liquidity zones are covered in the full course.
  `,
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

Remember: A stopped-out trade is a good trade if you followed your plan. Protecting your capital is always the priority.`,
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
`,
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
