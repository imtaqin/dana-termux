export const postDATA = (bizOrderId=null, paymentOrderId=null, bizOrderDetailId="paymentid") => {
    return {
        data: {
            profile_postdata: {
                extParams: {},
                queryType: 'BALANCE',
            },
            transaction_postdata: {
                transactionQueryType : 'COMPLETED',
                pageNum : 1,
                orderBy : 'DESC',
                startDate : '',
                endDate : '',
                bizOrderType : [],
                subBizOrderType : null,
                familyAccountMemberIds : [],
                paymentMethods : [],
                extendInfo : null,
                merchantId : ''
            },
            transactionDetail_postdata: {
                bizOrderId : bizOrderId,
                paymentOrderId : paymentOrderId,
                bizOrderDetailId : bizOrderDetailId,
            }
        }
    }
}

