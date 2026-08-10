export default function OrderOfService() {
  return (
    <div className="max-w-screen-lg mx-auto px-6 md:px-10 py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
          Anglican Church of Kenya · Diocese of Thika
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-600 mb-4" style={{ color: '#22201D', lineHeight: 1.1 }}>
          Order of Service
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B6560', fontFamily: 'Inter, sans-serif' }}>
          A Kenyan Service of Holy Communion — from <em>Our Modern Services</em>, the Prayer Book of the Anglican Church of Kenya
        </p>
      </div>

      <div className="space-y-0">
        {/* ─── THE PREPARATION ─── */}
        <Section title="The Preparation" />

        <LiturgicalBlock label="Greeting">
          <p><em>At the entry of the ministers the people stand. A hymn may be sung.</em></p>
          <p className="mt-3"><strong>Celebrant:</strong> The Lord be with you.</p>
          <p><strong>People:</strong> And also with you.</p>
        </LiturgicalBlock>

        <LiturgicalBlock label="Scripture Verse">
          <p><strong>Celebrant:</strong> The earth is the Lord's, and all that is in it.</p>
          <p><strong>People:</strong> Let the heavens rejoice and the earth be glad.</p>
        </LiturgicalBlock>

        <LiturgicalBlock label="Opening Prayer">
          <p><em>The people kneel.</em></p>
          <Prayer>
            Almighty God,<br />
            you bring to light things hidden in darkness,<br />
            and know the shadow of our hearts:<br />
            cleanse and renew us by your Spirit,<br />
            that we may walk in the light and glorify your name,<br />
            through Jesus Christ, the Light of the world.<br />
            <strong>Amen.</strong>
          </Prayer>
        </LiturgicalBlock>

        {/* ─── THE GLORIA ─── */}
        <Section title="The Gloria" subtitle="We stand to glorify the Lord" />

        <LiturgicalBlock>
          <p><strong>Celebrant:</strong> Glory to the Father,</p>
          <p><strong>People:</strong> <strong>Glory to the Son,</strong></p>
          <p><strong>Celebrant:</strong> Glory to the Spirit,</p>
          <p><strong>People:</strong> <strong>For ever Three in One.</strong></p>
          <p className="mt-2"><strong>Celebrant:</strong> Be glorified at home.</p>
          <p><strong>People:</strong> <strong>Be glorified in church.</strong></p>
          <p><strong>Celebrant:</strong> Be glorified in Kenya.</p>
          <p><strong>People:</strong> <strong>Be glorified in Africa.</strong></p>
          <p><strong>Celebrant:</strong> Be glorified on earth.</p>
          <p><strong>People:</strong> <strong>Be glorified in heaven.</strong></p>
          <p className="mt-2"><strong>Celebrant:</strong> Glory to the Father,</p>
          <p><strong>People:</strong> <strong>Glory to the Son,</strong></p>
          <p><strong>Celebrant:</strong> Glory to the Spirit,</p>
          <p><strong>People:</strong> <strong>For ever Three in One.</strong></p>
          <p className="mt-2"><strong>Celebrant:</strong> Hallelujah!</p>
          <p><strong>People:</strong> <strong>Amen.</strong></p>
        </LiturgicalBlock>

        <LiturgicalBlock label="Prayer of the Day">
          <p><em>As we stand, let us pray the prayers appointed for today.</em></p>
        </LiturgicalBlock>

        {/* ─── THE MINISTRY OF THE WORD ─── */}
        <Section title="The Ministry of the Word" subtitle="The people sit" />

        <LiturgicalBlock label="Old Testament Reading">
          <p><em>The Old Testament reading is taken from . . . chapter . . . beginning to read at verse . . .</em></p>
          <p className="mt-2"><strong>After the reading:</strong></p>
          <p><strong>Celebrant:</strong> This is the word of the Lord.</p>
          <p><strong>People:</strong> <strong>Hallelujah. Praise be to God!</strong></p>
          <p><em>Silence may be kept.</em></p>
        </LiturgicalBlock>

        <LiturgicalBlock label="The Epistle">
          <p><em>The epistle is taken from . . . chapter . . . beginning to read at verse . . .</em></p>
          <p className="mt-2"><strong>After the reading:</strong></p>
          <p><strong>Celebrant:</strong> This is the word of the Lord.</p>
          <p><strong>People:</strong> <strong>Hallelujah. Praise be to God!</strong></p>
          <p><em>Silence may be kept. A hymn, anthem, or psalm may be sung or read.</em></p>
        </LiturgicalBlock>

        <LiturgicalBlock label="The Gospel">
          <p><em>All stand for the reading.</em></p>
          <p className="mt-2"><strong>Celebrant:</strong> We stand to hear the good news of our salvation, as it is written in the Gospel according to . . . chapter . . . beginning to read at verse . . .</p>
          <p className="mt-2"><strong>After the gospel:</strong></p>
          <p><strong>Celebrant:</strong> This is the Gospel of Christ.</p>
          <p><strong>People:</strong> <strong>Hallelujah. Praise to Christ our Savior.</strong></p>
          <p><em>Silence may be kept. A hymn may be sung.</em></p>
        </LiturgicalBlock>

        {/* ─── THE SERMON ─── */}
        <Section title="The Sermon" />

        {/* ─── THE CREED ─── */}
        <Section title="The Creed" />

        <LiturgicalBlock>
          <p><strong>Celebrant:</strong> We stand together with Christians throughout the centuries, and throughout the world today, to affirm our faith in the words of the Nicene Creed.</p>
          <p><em>The people stand and recite the creed.</em></p>
        </LiturgicalBlock>

        {/* ─── THE INTERCESSIONS ─── */}
        <Section title="The Intercessions" subtitle="The people kneel" />

        <LiturgicalBlock>
          <p><strong>Celebrant:</strong> Let us pray.</p>
          <p className="mt-3">May the leaders of our churches have wisdom and speak with one voice.</p>
          <p><strong>People:</strong> <strong>Amen. Lord have mercy.</strong></p>
          <p className="mt-2">May the leaders of our country rule with righteousness.</p>
          <p><strong>People:</strong> <strong>Amen. Lord have mercy.</strong></p>
          <p className="mt-2">May justice be our shield and defender.</p>
          <p><strong>People:</strong> <strong>Amen. Lord have mercy.</strong></p>
          <p className="mt-2">May the country have peace and the people be blessed.</p>
          <p><strong>People:</strong> <strong>Amen. Lord have mercy.</strong></p>
          <p className="mt-2">May the flocks and the herds prosper and the fish abound in our lakes.</p>
          <p><strong>People:</strong> <strong>Amen. Lord have mercy.</strong></p>
          <p className="mt-2">May the fields be fertile and the harvest plentiful.</p>
          <p><strong>People:</strong> <strong>Amen. Lord have mercy.</strong></p>
          <p className="mt-2">May we and our enemies turn towards peace.</p>
          <p><strong>People:</strong> <strong>Amen. Lord have mercy.</strong></p>
          <p className="mt-2">May the love of the Father touch the lonely, the bereaved, and the suffering.</p>
          <p><strong>People:</strong> <strong>Amen. Lord have mercy.</strong></p>
          <p className="mt-2">May the path of the world be swept of all dangers.</p>
          <p><strong>People:</strong> <strong>Hallelujah. The Lord of mercy is with us.</strong></p>
        </LiturgicalBlock>

        {/* ─── PRAYERS OF PENITENCE ─── */}
        <Section title="Prayers of Penitence" subtitle="The people remain kneeling" />

        <LiturgicalBlock>
          <p><strong>Celebrant:</strong> Hear the words of challenge and comfort our Savior Christ says to all who follow him.</p>
          <p className="mt-3"><em>If anyone would come after me, let him deny himself, take up his cross, and follow me. For whoever would save his life will lose it; and whoever loses his life for my sake will save it</em> (Luke 9:23–24).</p>
          <p className="mt-2"><em>Come unto me, all who are tired of carrying your heavy loads, and I will give you rest</em> (Matthew 11:28).</p>
          <p className="mt-2">So, all of you who repent of your sins, who love your neighbors, and intend to live a new life following the way of Jesus, come with faith and take this holy sacrament to strengthen you. Let us reverently confess our sins to Almighty God.</p>
        </LiturgicalBlock>

        <LiturgicalBlock label="Prayer of Confession">
          <Prayer>
            <strong>Almighty God, creator of all,<br />
            you marvelously made us in your image;<br />
            but we have corrupted ourselves<br />
            and damaged your likeness<br />
            by rejecting your love and hurting our neighbors.<br />
            We have done wrong and neglected to do right.<br />
            We are sincerely sorry and heartily repent of our sins.<br />
            Cleanse us and forgive us by the sacrifice of your Son;<br />
            remake us and lead us by your Spirit, the Comforter.<br />
            We ask this through Jesus Christ our Lord. Amen.</strong>
          </Prayer>
        </LiturgicalBlock>

        <LiturgicalBlock label="Absolution">
          <Prayer>
            Almighty God, whose steadfast love is as great as the heavens are high above the earth, remove your sins from you, as far as the east is from the west, strengthen your life in his kingdom and keep you upright to the last day; through Jesus Christ, our merciful high priest. Amen.
          </Prayer>
        </LiturgicalBlock>

        <LiturgicalBlock label="Prayer of Thanksgiving">
          <Prayer>
            <strong>Thank you, Father, for forgiveness.<br />
            We come to your table as your children,<br />
            not presuming but assured,<br />
            not trusting ourselves but your Word;<br />
            we hunger and thirst for righteousness,<br />
            and ask for our hearts to be satisfied<br />
            with the body and blood of your Son,<br />
            Jesus Christ the righteous. Amen.</strong>
          </Prayer>
        </LiturgicalBlock>

        {/* ─── THE MINISTRY OF THE SACRAMENT ─── */}
        <Section title="The Ministry of the Sacrament" />

        <LiturgicalBlock label="The Sharing of the Peace">
          <p><em>The people stand.</em></p>
          <p><strong>Celebrant:</strong> The peace of the Lord be always with you.</p>
          <p><strong>People:</strong> <strong>And also with you.</strong></p>
          <p className="mt-2"><strong>Celebrant:</strong> Let us offer one another a sign of peace.</p>
          <p><em>The people greet each other with a handshake or other appropriate gesture.</em></p>
          <p className="mt-2"><em>As the Holy Table is prepared, bread and wine may be brought to the minister. A hymn may be sung, during which the offering is collected.</em></p>
          <p className="mt-2"><strong>People:</strong> <strong>All things come from you, O Lord, and of your own have we given you.</strong></p>
        </LiturgicalBlock>

        <LiturgicalBlock label="The Prayer of Thanksgiving">
          <p><em>The people remain standing.</em></p>
          <p className="mt-3"><strong>Celebrant:</strong> Is the Father with us?</p>
          <p><strong>People:</strong> <strong>He is.</strong></p>
          <p><strong>Celebrant:</strong> Is Christ among us?</p>
          <p><strong>People:</strong> <strong>He is.</strong></p>
          <p><strong>Celebrant:</strong> Is the Spirit here?</p>
          <p><strong>People:</strong> <strong>He is.</strong></p>
          <p><strong>Celebrant:</strong> This is our God.</p>
          <p><strong>People:</strong> <strong>Father, Son, and Holy Spirit.</strong></p>
          <p><strong>Celebrant:</strong> We are his people.</p>
          <p><strong>People:</strong> <strong>We are redeemed.</strong></p>
          <p className="mt-2"><strong>Celebrant:</strong> Lift up your hearts.</p>
          <p><strong>People:</strong> <strong>We lift them to the Lord.</strong></p>
          <p><strong>Celebrant:</strong> Let us give thanks to the Lord our God.</p>
          <p><strong>People:</strong> <strong>It is right to give him thanks and praise.</strong></p>
        </LiturgicalBlock>

        <LiturgicalBlock>
          <Prayer>
            It is right and our delight to give you thanks and praise, great Father, living God, supreme over the world, Creator, Provider, Savior and Giver. From a wandering nomad you created your family; for a burdened people you raised up a leader; for a confused nation you chose a king; for a rebellious crowd you sent your prophets. In these last days you have sent us your Son, your perfect image, bringing your kingdom, revealing your will, dying, rising, reigning, and remaking your people for himself. Through him you have poured out your Holy Spirit, filling us with light and life.
          </Prayer>
        </LiturgicalBlock>

        <LiturgicalBlock label="Sanctus">
          <p className="text-center"><strong>Therefore with angels, archangels, faithful ancestors, and all in heaven, we proclaim your great and glorious name, forever praising you and saying:</strong></p>
          <Prayer>
            <strong>Holy, holy, holy Lord, God of power and might,<br />
            heaven and earth are full of your glory.<br />
            Hosanna in the highest.</strong>
          </Prayer>
        </LiturgicalBlock>

        <LiturgicalBlock label="Words of Institution">
          <Prayer>
            Almighty God, owner of all things, we thank you for giving up your only Son to die on the cross for us who owe you everything. Pour your refreshing Spirit on us as we remember him in the way he commanded, through these gifts of your creation.
          </Prayer>
          <p className="mt-3"><em>On the same night that he was betrayed he took bread and gave you thanks; he broke it and gave it to his disciples saying,</em></p>
          <p className="mt-2"><strong>"Take, eat; this is my body which is given for you. Do this in remembrance of me."</strong></p>
          <p className="mt-2"><strong>People:</strong> <strong>Amen. His body was broken for us.</strong></p>
          <p className="mt-3"><em>In the same way, after supper he took the cup and gave thanks; he gave it to them, saying,</em></p>
          <p className="mt-2"><strong>"Drink this, all of you; this is my blood of the new covenant which is shed for you and for many for the forgiveness of sins. Do this as often as you drink it, in remembrance of me."</strong></p>
          <p className="mt-3"><strong>People:</strong></p>
          <p><strong>Christ has died.</strong></p>
          <p><strong>Christ is risen.</strong></p>
          <p><strong>Christ will come again.</strong></p>
          <p className="mt-3"><strong>Celebrant:</strong> We are brothers and sisters through his blood.</p>
          <p><strong>People:</strong></p>
          <p><strong>We have died together,</strong></p>
          <p><strong>we will rise together,</strong></p>
          <p><strong>we will live together.</strong></p>
        </LiturgicalBlock>

        <LiturgicalBlock>
          <Prayer>
            Therefore, heavenly Father, hear us as we celebrate this covenant with joy, and await the coming of our brother, Jesus Christ. He died in our place, making a full atonement for the sins of the whole world, the perfect sacrifice, once and for all. You accepted his offering by raising him from death, and granting him great honor at your right hand on high.
          </Prayer>
          <p className="mt-3"><strong>People:</strong> <strong>Amen. Jesus is Lord.</strong></p>
          <p className="mt-3"><strong>Celebrant:</strong> This is the feast of victory.</p>
          <p><strong>People:</strong> <strong>The lamb who was slain has begun his reign. Hallelujah!</strong></p>
        </LiturgicalBlock>

        {/* ─── THE COMMUNION ─── */}
        <Section title="The Communion" subtitle="The people kneel" />

        <LiturgicalBlock label="The Lord's Prayer">
          <p><strong>Celebrant:</strong> As Jesus taught us, so we pray:</p>
          <Prayer>
            <strong>Our Father in heaven, holy be your name,<br />
            your kingdom come, your will be done,<br />
            on earth as in heaven.<br />
            Give us today our daily bread.<br />
            Forgive us our sins,<br />
            as we forgive those who sin against us.<br />
            Do not bring us to the test,<br />
            and deliver us from evil.<br />
            For the kingdom, the power, and the glory<br />
            are yours, now and forever. Amen.</strong>
          </Prayer>
        </LiturgicalBlock>

        <LiturgicalBlock>
          <p><strong>Celebrant:</strong> Christ is alive forever.</p>
          <p><strong>People:</strong> <strong>We are because he is.</strong></p>
          <p className="mt-2"><strong>Celebrant:</strong> We are one body.</p>
          <p><strong>People:</strong> <strong>We share one bread.</strong></p>
          <p className="mt-2"><strong>Celebrant:</strong> Draw near with faith.</p>
          <p><strong>People:</strong> <strong>Christ is the host and we are his guests.</strong></p>
        </LiturgicalBlock>

        <LiturgicalBlock label="Distribution">
          <Prayer>
            <strong>M:</strong> The body of our Lord Jesus Christ, which was given for you, keep your body and soul in eternal life. Take and eat this in remembrance that Christ died for you, and feed on him in your hearts, by faith, with thanksgiving.
          </Prayer>
          <Prayer>
            <strong>A:</strong> The blood of our Lord Jesus Christ, which was shed for you, keep your body and soul in eternal life. Drink this, in remembrance that Christ's blood was shed for you, and be thankful.
          </Prayer>
          <p className="mt-3"><em>As the bread and wine are distributed, the minister may say to each communicant:</em></p>
          <p><strong>M:</strong> The body of Christ keep you in eternal life.</p>
          <p><strong>A:</strong> The blood of Christ keep you in eternal life.</p>
          <p><em>Each time the communicant replies "Amen," then receives the elements. During communion prayerful songs may be sung.</em></p>
        </LiturgicalBlock>

        {/* ─── THE SENDING ─── */}
        <Section title="The Sending" subtitle="The people stand" />

        <LiturgicalBlock label="Prayer after Communion">
          <Prayer>
            Almighty God, eternal Father, we have sat at your feet, learned from your word, and eaten from your table. We give you thanks and praise for accepting us into your family. Send us out with your blessing, to live and to witness for you in the power of your Spirit, through Jesus Christ, the firstborn from the dead.
            <strong> Amen.</strong>
          </Prayer>
        </LiturgicalBlock>

        <LiturgicalBlock label="The Blessing">
          <p><em>The people accompany the first three responses with a sweep of the arm towards the cross, and their final response with a sweep towards heaven.</em></p>
          <p className="mt-3"><strong>Celebrant:</strong> All our problems</p>
          <p><strong>People:</strong> <strong>We send to the cross of Christ.</strong></p>
          <p className="mt-2"><strong>Celebrant:</strong> All our difficulties</p>
          <p><strong>People:</strong> <strong>We send to the cross of Christ.</strong></p>
          <p className="mt-2"><strong>Celebrant:</strong> All the devil's works</p>
          <p><strong>People:</strong> <strong>We send to the cross of Christ.</strong></p>
          <p className="mt-2"><strong>Celebrant:</strong> All our hopes</p>
          <p><strong>People:</strong> <strong>We set on the risen Christ.</strong></p>
          <p className="mt-3"><em>The Celebrant blesses:</em></p>
          <Prayer>
            Christ the Sun of Righteousness shine upon you and scatter the darkness from before your path: and the blessing of God Almighty, Father, Son, and Holy Spirit, be among you, and remain with you always.
            <strong> Amen.</strong>
          </Prayer>
        </LiturgicalBlock>

        <LiturgicalBlock label="Dismissal">
          <p><strong>Celebrant:</strong> Go out into the world, rejoicing in the power of the Spirit.</p>
          <p><strong>People:</strong> <strong>Thanks be to God!</strong></p>
          <p><em>A final hymn may be sung as the ministers depart.</em></p>
        </LiturgicalBlock>
      </div>

      {/* Footer note */}
      <div className="mt-16 pt-8 text-center" style={{ borderTop: '1px solid rgba(34,32,29,0.08)' }}>
        <p className="text-sm italic" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
          From <em>Our Modern Services</em>, the Prayer Book of the Anglican Church of Kenya (Uzima Press, 2002).
        </p>
        <p className="text-xs mt-2" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>
          Based on <em>JLS 50: Offerings from Kenya to Anglicanism</em>, Graham Kings and Geoff Morgan, eds. (Grove Books, 2001).
        </p>
      </div>
    </div>
  )
}

/* ─── Helper Components ─── */

function Section({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="pt-12 pb-4">
      <h2 className="font-display text-2xl md:text-3xl font-600" style={{ color: '#22201D' }}>{title}</h2>
      {subtitle && <p className="text-sm mt-1 italic" style={{ color: '#B8B2A8', fontFamily: 'Inter, sans-serif' }}>{subtitle}</p>}
      <div className="mt-3 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,162,75,0.4), transparent)' }} />
    </div>
  )
}

function LiturgicalBlock({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="py-5 px-6 md:px-8 mb-4" style={{ background: 'rgba(247,245,241,0.5)', borderLeft: '3px solid rgba(201,162,75,0.3)' }}>
      {label && (
        <div className="text-[11px] uppercase tracking-[0.15em] font-semibold mb-3" style={{ color: '#C9A24B', fontFamily: 'Inter, sans-serif' }}>
          {label}
        </div>
      )}
      <div className="space-y-1" style={{ color: '#22201D', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  )
}

function Prayer({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-4 py-2 my-2" style={{ borderLeft: '2px solid rgba(201,162,75,0.2)', fontStyle: 'italic' }}>
      {children}
    </div>
  )
}
