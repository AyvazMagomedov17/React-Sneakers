import { Formik } from 'formik'
import s from '../../styles/common/search.module.scss'
import findSvg from '../../assets/img/Search/find.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getFilterSelector } from '../../redux/Selectors/productsSliceSelectors'
import cn from 'classnames'
import { productsSliceActions } from '../../redux/reducers/productsSlice'


type PropsType = {}

const Search = ({ }: PropsType) => {
    const dispatch = useAppDispatch()
    const filter = useAppSelector(getFilterSelector)
    return (
        <Formik enableReinitialize initialValues={
            {
                filter: {
                    isLiked: filter.isLiked,
                    title: filter.title
                }
            }

        }
            onSubmit={async (values) => {
                dispatch(productsSliceActions.setFilter({ title: values.filter.title, isLiked: null }))

                if (values.filter.isLiked.length === 0) {

                    dispatch(productsSliceActions.setFilter({ title: values.filter.title, isLiked: null }))
                } else {
                    dispatch(productsSliceActions.setFilter(values.filter))
                }


            }}>{({ handleSubmit, handleChange, values }) => (
                <div className={s.container}>
                    <div className={s.column}>
                        <div className={s.search}>
                            <div className={s.body}>
                                <div className={s.findImg}>
                                    <img src={findSvg} alt="find icon" />
                                </div>
                                <input name='filter.title' onKeyDown={(e) => {
                                    if (e.keyCode === 13) handleSubmit()
                                }} value={values.filter.title} placeholder='Поиск...' onChange={async (e) => {
                                    handleChange(e)


                                }} type="text" className={s.input} />
                            </div>
                        </div>
                        <div className={s.filter}>
                            <div className={cn(s.isLikedBox, s.filterBox)}>
                                <span className={s.text}>Только избранное</span>
                                <input id='isLikedCheckbox' checked={values.filter.isLiked} onChange={(e) => {
                                    handleChange(e)
                                    handleSubmit()
                                }} name='filter.isLiked' type="checkbox" className={s.isLiked} />
                                <label htmlFor="isLikedCheckbox"></label>
                            </div>

                        </div>
                    </div>

                </div>

            )}

        </Formik>
    )
}

export default Search