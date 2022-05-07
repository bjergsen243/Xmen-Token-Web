import { Button, makeStyles } from "@material-ui/core"
import { useEthers, useTokenBalance, useEtherBalance } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1)
  },
}))

export const Header = () => {
  const classes = useStyles()
  
  const { account, activateBrowserWallet, deactivate } = useEthers()
  //const userBalance = useEtherBalance(account)
  const tokenBalance = useTokenBalance("0x534Eb14712bE0730af161Bc746E984487bD25102", account);
  const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
  const isConnected = account !== undefined

  return (
    <div className={classes.container}>
      {isConnected ? (
        <>
          <Button color="primary" variant="contained">
            {`${account?.slice(0, 4)}...${account?.slice(-3)}`}
          </Button>
          <Button variant="contained" onClick={deactivate}>
            Disconnect
          </Button >
           
          <Button color="primary" variant="contained">
            {`Amount = ${formattedTokenBalance}`}
          </Button>
        </>
      ) : (
        <Button
          color="primary"
          variant="contained"
          onClick={() => activateBrowserWallet()}
        >
          Connect
        </Button>
      )}
    </div>
  )
}
