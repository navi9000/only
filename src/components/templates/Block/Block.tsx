import type { FC } from "react"
import styles from "./Block.module.scss"
import DateScreen from "@/components/organisms/DateScreen/DateScreen"
import CardList from "@/components/organisms/CardList/CardList"
import type { BlockData } from "@/utils/types"
import BlockContextProvider from "./BlockContextProvider"

const Block: FC<BlockData> = ({ data }) => {
  return (
    <BlockContextProvider data={{ data }}>
      <section className={styles.blockcontainer}>
        <div className={styles.block}>
          <DateScreen />
          <CardList className={styles.cardlist} />
        </div>
      </section>
    </BlockContextProvider>
  )
}

export default Block
